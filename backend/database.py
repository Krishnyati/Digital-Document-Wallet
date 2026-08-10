from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)

db = client["digital_document_wallet"]

users_collection = db["users"]

