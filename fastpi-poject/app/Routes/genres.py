from fastapi import APIRouter
from app.Models import genre
from app.Controllers.genres import   get_genres_controller

router = APIRouter(prefix="/genres", tags=["Genres"])

 

@router.get("/")
def get_genres():
    return get_genres_controller()