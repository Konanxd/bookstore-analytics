from flask import Blueprint, jsonify, request
from app.services.genre_service import GenreService

genre_routes = Blueprint('genre_routes', __name__)

@genre_routes.route('/genre', methods=['GET'])
def get_genre():
    genre = GenreService.get_all_genre()
    return jsonify([g.to_dict() for g in genre])

@genre_routes.route("/genre/<int:genre_id>", methods=["GET"])
def get_genre_by_id(genre_id):
    genre = GenreService.get_genre_by_id(genre_id)
    if not genre:
        return jsonify({"message": "Genre not found"}), 404
    return jsonify(genre.to_dict())

@genre_routes.route("/genre", methods=["POST"])
def create_genre():
    data = request.get_json()
    if "nama_genre" not in data:
        return jsonify({"message": "Name of the genre is required"}), 400

    new_genre = GenreService.add_genre(data)
    return jsonify(new_genre.to_dict()), 201

@genre_routes.route("/genre/<int:genre_id>", methods=["PUT"])
def update_genre(genre_id):
    data = request.get_json()
    updated_genre = GenreService.update_genre(genre_id, data)
    if not updated_genre:
        return jsonify({"message": "Genre not found"}), 404
    return jsonify(updated_genre.to_dict())

@genre_routes.route("/genre/<int:genre_id>", methods=["DELETE"])
def delete_genre(genre_id):
    deleted_genre_id = GenreService.delete_genre(genre_id)
    if not deleted_genre_id:
        return jsonify({"message": "Genre not found"}), 404
    return jsonify({"message": f"Genre {deleted_genre_id} deleted successfully"}), 200
