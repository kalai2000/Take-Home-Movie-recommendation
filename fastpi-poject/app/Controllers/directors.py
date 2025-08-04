from app.db import directors_collection
from app.Models import director  # importing the module

def get_directors_controller():
    directors_list = list(directors_collection.find())
    for d in directors_list:
        d["_id"] = str(d["_id"])
    return directors_list

def get_director_by_name_controller(name: str):
    doc = directors_collection.find_one(
        {"name": {"$regex": f"^{name}$", "$options": "i"}}
    )
    if not doc:
        return {"error": f"No director found with name '{name}'"}

    doc["_id"] = str(doc["_id"])
    return doc