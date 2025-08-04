from pydantic import BaseModel, Field
from typing import List

class Actor(BaseModel):
    name: str = Field(..., json_schema_extra={"example": "Leonardo DiCaprio"})
    age: int = Field(..., ge=1, le=100, json_schema_extra={"example": 48})
    movies: List[str] = Field(
        default_factory=list,
        json_schema_extra={"example": ["Inception", "The Revenant"]}
    )