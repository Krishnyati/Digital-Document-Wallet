from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
from authentication import authentication
import os

#now we load the variables from the .env file
load_dotenv()

#creating Flask Application
app = Flask(__name__)

#allowing Frontend to connect with the Backend
CORS(app)

#JWT [Jason Web Tokens] Secret Key
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")

#Enable JWT
JWTManager(app)

#Connect Authentication Routes
app.register_blueprint(authentication)

#Home Page / Test Route
@app.route("/")
def home():
    return{
        "message" : "Digital Document Wallet Backend Is Running Successfully"
    }

#Starting Flask Server
if __name__ == "__main__":
    app.run(debug=False)