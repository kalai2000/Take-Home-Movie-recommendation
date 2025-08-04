from pydantic import BaseModel, Field
from typing import List

class Genre(BaseModel):
    name: str = Field(..., json_schema_extra={"example": "Sci-Fi"})
    description: str = Field(default_factory=str, json_schema_extra={
        "example": "Fictional stories based on future science or tech"
    })