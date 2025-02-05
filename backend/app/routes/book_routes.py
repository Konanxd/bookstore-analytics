from flask import Blueprint, jsonify, request
from app.services.book_service import BookService
from app.utils.database import db

buku_routes = Blueprint('buku_routes', __name__)

@buku_routes.route('/books', methods=['GET'])
def get_books():
    books = BookService.get_all_books()
    return jsonify([book.to_dict() for book in books])

@buku_routes.route("/books/<int:book_id>", methods=["GET"])
def get_book(book_id):
    book = BookService.get_book_by_id(book_id)
    if not book:
        return jsonify({"message": "Book not found"}), 404
    return jsonify(book.to_dict())

@buku_routes.route("/books", methods=["POST"])
def create_book():
    data = request.get_json()
    if "title" not in data or "author" not in data:
        return jsonify({"message": "Title and Author are required"}), 400

    new_book = BookService.create_book(data)
    return jsonify(new_book.to_dict()), 201

@buku_routes.route("/books/<int:book_id>", methods=["PUT"])
def update_book(book_id):
    data = request.get_json()
    updated_book = BookService.update_book(book_id, data)
    if not updated_book:
        return jsonify({"message": "Book not found"}), 404
    return jsonify(updated_book.to_dict())

@buku_routes.route("/books/<int:book_id>", methods=["DELETE"])
def delete_book(book_id):
    deleted_book_id = BookService.delete_book(book_id)
    if not deleted_book_id:
        return jsonify({"message": "Book not found"}), 404
    return jsonify({"message": f"Book {deleted_book_id} deleted successfully"}), 200