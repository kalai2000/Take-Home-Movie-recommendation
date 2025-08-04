from pydantic import BaseModel, Field
from typing import List

class Director(BaseModel):
    name: str = Field(..., json_schema_extra={"example": "Christopher Nolan"})
    birth_year: int = Field(..., json_schema_extra={"example": 1970})
    movies: List[str] = Field(
        default_factory=list,
        json_schema_extra={"example": ["Inception", "Interstellar", "Tenet"]}
    )