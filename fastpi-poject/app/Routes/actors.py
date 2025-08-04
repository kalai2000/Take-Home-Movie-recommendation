from fastapi import APIRouter, Query, HTTPException
from app.Models import actors
from app.Controllers.actors import (
     
    get_actors_controller,
    get_actor_by_name_controller   
)

router = APIRouter(prefix="/actors", tags=["Actors"])


@router.get("/")
def get_actors(
    movie: str = Query(None),
    genre: str = Query(None),
):
    return get_actors_controller(movie, genre)


@router.get("/{name}")
def get_actor_by_name(name: str):
    actor = get_actor_by_name_controller(name)
    if not actor:
        raise HTTPException(status_code=404, detail=f"Actor '{name}' not found")
    actor["_id"] = str(actor["_id"])  # Ensure ObjectId is serializable
    return actor