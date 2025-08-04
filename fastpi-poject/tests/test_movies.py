from app.Routes.movies import get_movies, get_movie_by_id
from app.Controllers import movie_utils
from app.db import movies_collection

import pytest
from unittest.mock import patch, MagicMock
from bson import ObjectId


def test_get_movies_unit():
    filters = {
        "genre": "Action",
        "director": "Christopher Nolan",
        "actor": "Christian Bale",
        "year": "2008"
    }

    mock_result = [{"title": "The Dark Knight"}]

    with patch("app.Routes.movies.get_movies_controller", return_value=mock_result):
        response = get_movies(**filters)
        assert response == mock_result


def test_get_movie_by_id_valid():
    mock_movie = {"_id": ObjectId(), "title": "Inception"}

    with patch("app.Routes.movies.movies_collection.find_one", return_value=mock_movie), \
         patch("app.Routes.movies.serialize_movie", return_value={"title": "Inception"}):
        result = get_movie_by_id(str(mock_movie["_id"]))
        assert result == {"title": "Inception"}


def test_get_movie_by_id_invalid_format():
    with pytest.raises(Exception) as exc_info:
        get_movie_by_id("not_a_valid_id")
    assert exc_info.value.status_code == 400
    assert "Invalid movie ID format" in str(exc_info.value)


def test_get_movie_by_id_not_found():
    valid_id = str(ObjectId())

    with patch("app.Routes.movies.movies_collection.find_one", return_value=None):
        with pytest.raises(Exception) as exc_info:
            get_movie_by_id(valid_id)
        assert exc_info.value.status_code == 404
        assert "Not Found" in str(exc_info.value)