from flask_jwt_extended import create_access_token
from flask import Blueprint, request, jsonify
from database import users_collection
import bcrypt

# Create authentication blueprint
authentication = Blueprint("authentication", __name__)


# =========================
# USER REGISTRATION
# =========================
@authentication.route("/register", methods=["POST"])
def register():

    # Check if request contains JSON
    if not request.is_json:
        return jsonify({
            "message": "Please send data as JSON"
        }), 415

    # Get JSON data
    data = request.get_json()

    print("Received Data:", data)

    # Check if data was received
    if not data:
        return jsonify({
            "message": "No data received"
        }), 400

    # Get user information
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    # Check required fields
    if not name or not email or not password:
        return jsonify({
            "message": "Name, email and password are required"
        }), 400

    # Check if email already exists
    existing_user = users_collection.find_one({
        "email": email
    })

    if existing_user:
        return jsonify({
            "message": "Email already registered"
        }), 409

    # Hash password
    hashed_password = bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    )

    # Create user
    user = {
        "name": name,
        "email": email,
        "password": hashed_password.decode("utf-8")
    }

    # Save user in MongoDB
    users_collection.insert_one(user)

    return jsonify({
        "message": "User registered successfully"
    }), 201

#USER Login
@authentication.route("/login",methods=["POST"])
def login():

    #GET JSON DATA
    data = request.get_json()

    #Check if Data Was recived
    if not data:
        return jsonify({
            "message" : "No Data is Recevied"
        }),400

    email = data.get("email")
    password = data.get("password")

    #Check Required Fields
    if not email or not password:
        return jsonify({
            "message" : "Email and Password are Required For Login "
        }),400

    #Find user by email
    user = users_collection.find_one({
        "email" : email
    })

    #Check if user is registered with same email
    if not user:
        return jsonify({
            "message" : "Invalid Email or Password "
        }),401

    #Check Passwords
    password_is_correct = bcrypt.checkpw(
        password.encode("utf-8"),
        user["password"].encode("utf-8")
    )
    
    #If password is Wrong
    if not password_is_correct:
        return jsonify({
        "message" : "Invalid Email or Password "
        }),401

    #Create JWT Token
    access_token = create_access_token(
        identity = str(user["_id"])
    )

    #User Login Successfully
    return jsonify({
        "message": "Login successful",
        "token": access_token
    }), 200