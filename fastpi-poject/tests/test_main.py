from fastapi.testclient import TestClient
from app.main import app  # Adjust import if your FastAPI instance lives elsewhere

client = TestClient(app)

def test_directors_route_root():
    response = client.get("/directors/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_actors_invalid_actor():
    response = client.get("/actors/Nonexistent Name")
    assert response.status_code == 404
    assert "not found" in response.json()["detail"]

def test_genres_endpoint():
    response = client.get("/genres/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_movies_endpoint():
    response = client.get("/movies/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)