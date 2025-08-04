from fastapi import APIRouter
from app.Models import director
from app.Controllers.directors import get_directors_controller,get_director_by_name_controller

router = APIRouter(prefix="/directors", tags=["Directors"])

@router.get("/")
def get_directors():
    return get_directors_controller()

@router.get("/{name}")
def get_director_by_name(name: str):
    return get_director_by_name_controller(name)