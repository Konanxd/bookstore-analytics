from flask import Flask
from config import Config
from app.utils.database import init_db

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    init_db(app)

    from app.routes.book_routes import book_routes
    app.register_blueprint(book_routes)

    return app