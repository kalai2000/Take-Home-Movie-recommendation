from fastapi import APIRouter, Query, HTTPException
from typing import Optional
from bson import ObjectId

from app.Models import movies  # ✅ Importing the module, not the class
from app.db import movies_collection
from app.Controllers.movie_utils import (  # ✅ Use utils instead of Movies.py
     
    get_movies_controller,
    serialize_movie,
)

router = APIRouter(prefix="/movies", tags=["Movies"])
 
 
#   Fetch movies with optional filters
@router.get("/")
def get_movies(
    genre: Optional[str] = Query(None),
    director: Optional[str] = Query(None),
    actor: Optional[str] = Query(None, alias="actors"),  # ✅ Matches frontend key
    year: Optional[str] = Query(None, alias="year")      # Accepts year as string
):
     

    filters = {
        "genre": genre,
        "director": director,
        "actors": actor,
        "year": year
    }

    return get_movies_controller(filters)

# 📽️ Fetch a single movie by ID
@router.get("/{movie_id}")
def get_movie_by_id(movie_id: str):
    try:
        obj_id = ObjectId(movie_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid movie ID format")

    movie = movies_collection.find_one({"_id": obj_id})

    if not movie:
        raise HTTPException(status_code=404, detail="Not Found")

    return serialize_movie(movie)