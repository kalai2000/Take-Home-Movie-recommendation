from pydantic import BaseModel, Field
from typing import List

class Movie(BaseModel):
    title: str = Field(..., json_schema_extra={"example": "Inception"})
    release_year: int = Field(..., example=2010)
    genres: List[str] = Field(default=[], example=["Sci-Fi", "Thriller"])
    director: str = Field(..., example="Christopher Nolan")
    actors: List[str] = Field(default=[], example=["Leonardo DiCaprio", "Joseph Gordon-Levitt"])