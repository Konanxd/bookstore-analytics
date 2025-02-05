from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from config import Config
from app.utils.database import db

app = Flask(__name__)
CORS(app)
app.config.from_object(Config)

db.init_app(app)

from app.routes import register_routes
register_routes(app)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=Config.DEBUG)
