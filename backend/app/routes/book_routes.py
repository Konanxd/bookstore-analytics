from flask import Blueprint, jsonify, request
from app.models.book import Book
from app.utils.database import db

book_routes = Blueprint('book_routes', __name__)

@book_routes.route('/books', methods=['GET'])
def get_books():
    books = Book.query.all()
    return jsonify([book.to_dict()] for book in books)

