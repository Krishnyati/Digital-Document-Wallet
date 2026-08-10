from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

print("MONGO DB IS TESTING.............")

try:
    client = MongoClient(
        MONGO_URI,
        serverSelectionTimeoutMS=10000
    )

    client.admin.command("ping")

    print("SUCCESS")

    print("MONGODB CONNECTION IS WORKING")

except Exception as e:
    print("FAILED TO CONNECT ")
    print("ERROR :")
    print(e)