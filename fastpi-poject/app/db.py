from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Read the MongoDB URI
MONGO_URI = os.getenv("MONGO_URI")

# Debugging output — verify it's loaded
print("Loaded Mongo URI")

# Initialize MongoDB client and select the database
client = MongoClient(MONGO_URI)
db = client["FastAPI"]


# Collections
movies_collection = db["movies"]
actors_collection = db["actors"]
directors_collection = db["directors"]
genres_collection = db["genres"]

 