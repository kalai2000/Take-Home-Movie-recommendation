import pytest
from app.Controllers.actors import (
    get_actors_controller,
    get_actor_by_name_controller
)
from fastapi import HTTPException


def test_get_actors_with_filters():
    result = get_actors_controller(movie="Inception", genre="Sci-Fi")
    assert isinstance(result, list)

def test_get_actor_by_name_valid():
    actor = get_actor_by_name_controller("Leonardo DiCaprio")
    assert actor is not None
    assert actor["name"] == "Leonardo DiCaprio"

def test_get_actor_by_name_invalid():
    with pytest.raises(HTTPException) as exc_info:
        get_actor_by_name_controller("Unknown Actor")
    assert exc_info.value.status_code == 404
    assert "Unknown Actor" in exc_info.value.detail
