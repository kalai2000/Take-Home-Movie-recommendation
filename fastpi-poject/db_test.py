# db.py

import os
from dotenv import load_dotenv
from pymongo import MongoClient

#   Load environment variables from .env
load_dotenv()

#   Get Mongo URI from environment
MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise ValueError(" MONGO_URI not found in environment")

#   Initialize MongoDB client
client = MongoClient(MONGO_URI)

#   Select database
db = client["FastAPI"]

#   Diagnostics (optional — remove in production!)
print(" Connected to DB:", db.name)
print("  Available collections:", db.list_collection_names())
print(" Sample movie:", db["movies"].find_one())