import pytest
from app.Controllers.directors import (
    get_directors_controller,
    get_director_by_name_controller
)

def test_get_directors_controller():
    result = get_directors_controller()
    assert isinstance(result, list)
    assert any(d["name"] == "Christopher Nolan" for d in result)

def test_get_director_by_name_controller_valid():
    result = get_director_by_name_controller("Christopher Nolan")
    assert result is not None
    assert result["name"] == "Christopher Nolan"
    assert "movies" in result

def test_get_director_by_name_controller_invalid():
    result = get_director_by_name_controller("Unknown Director")
    assert isinstance(result, dict)
    assert "error" in result
    assert "Unknown Director" in result["error"]