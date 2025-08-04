from fastapi import HTTPException
from app.db import actors_collection, movies_collection
from app.Models import actors  # importing the Actor model
from bson.regex import Regex
from typing import Optional, List
from bson import ObjectId



# Get list of actors filtered by movie or genre
def get_actors_controller(movie: Optional[str] = None, genre: Optional[str] = None) -> List[dict]:
    query = {}

    if movie:
        movie_doc = movies_collection.find_one({"title": movie})
        if movie_doc:
            query["name"] = {"$in": movie_doc.get("actors", [])}

    elif genre:
        actor_names = set()
        for movie_doc in movies_collection.find({"genres": genre}):
            actor_names.update(movie_doc.get("actors", []))
        query["name"] = {"$in": list(actor_names)}

    actors_list = list(actors_collection.find(query))
    for a in actors_list:
        a["_id"] = str(a["_id"])
    return actors_list


#  Fetch a single actor by exact name (case-insensitive)
def get_actor_by_name_controller(name: str) -> dict:
    actor = actors_collection.find_one({"name": Regex(f"^{name}$", "i")})
    if not actor:
        raise HTTPException(status_code=404, detail=f"Actor '{name}' not found")
    actor["_id"] = str(actor["_id"])
    return actor

