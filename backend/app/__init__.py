from flask import Flask
from flask_cors import CORS
from config import Config
from app.utils.database import db, init_db
from app.routes import register_routes

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(Config)  # Load configuration from config.py

    # Initialize the database
    init_db(app)  # Ensure that the app is passed to the `init_db()` function

    # Register routes
    register_routes(app)

    return app
