from app.db import genres_collection
from app.Models import genre  # importing the module

def get_genres_controller():
    genres_list = list(genres_collection.find())
    for g in genres_list:
        g["_id"] = str(g["_id"])
    return genres_list