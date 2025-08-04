from bson import ObjectId
from app.db import movies_collection
from app.Models.movies import Movie   

#   Serialize MongoDB movie document into JSON-friendly format
def serialize_movie(doc: dict) -> dict:
    return {
        "id": str(doc["_id"]),
        "title": doc.get("title", ""),
        "release_year": doc.get("release_year"),
        "genres": doc.get("genres", []),
        "director": doc["director"]["name"] if isinstance(doc.get("director"), dict) else doc.get("director", ""),
        "actors": doc.get("actors", [])  #   Handles plain list of strings or nested dicts
    }

 

#  Fetch movies with filters applied
def get_movies_controller(filters: dict) -> list:
     

    #   Strip blanks
    filters = {
        k: v for k, v in filters.items()
        if v is not None and str(v).strip() != ""
    }
     

    query = {}

    #   Match genre in array
    if "genre" in filters:
        query["genres"] = {
            "$elemMatch": {
                "$regex": filters["genre"],
                "$options": "i"
            }
        }

    #   Match director name (handles both dict and string)
    if "director" in filters:
        query["$or"] = [
            { "director.name": { "$regex": filters["director"], "$options": "i" } },
            { "director": { "$regex": filters["director"], "$options": "i" } }
        ]

    #   Match actor name (handles both dict and string)
    if "actors" in filters:
        query["$or"] = [
            { "actors.name": {
                "$elemMatch": {
                    "$regex": filters["actors"],
                    "$options": "i"
                }
            }},
            { "actors": {
                "$elemMatch": {
                    "$regex": filters["actors"],
                    "$options": "i"
                }
            }}
        ]

    #   Match release year
    if "year" in filters:
        try:
            query["release_year"] = int(filters["year"])
        except ValueError:
            print(f"Invalid year value: {filters['year']}")

    #   Match title
    if "title" in filters:
        query["title"] = {
            "$regex": filters["title"],
            "$options": "i"
        }

    movies = list(movies_collection.find(query))
    return [serialize_movie(m) for m in movies]