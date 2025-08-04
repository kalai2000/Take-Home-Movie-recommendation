from app.Routes.genres import get_genres
from unittest.mock import patch
import pytest

def test_get_genres_unit():
    mock_result = [
        {"name": "Sci-Fi", "description": "Fictional tech-driven stories"},
        {"name": "Thriller", "description": "Edge-of-your-seat suspense"}
    ]

    with patch("app.Routes.genres.get_genres_controller", return_value=mock_result):
        response = get_genres()
        assert response == mock_result