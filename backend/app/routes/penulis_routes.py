from flask import Blueprint, jsonify, request
from app.services.penulis_service import PenulisService

penulis_routes = Blueprint('penulis_routes', __name__)

@penulis_routes.route('/penulis', methods=['GET'])
def get_penulis():
    penulis = PenulisService.get_all_penulis()
    return jsonify([p.to_dict() for p in penulis])

@penulis_routes.route("/penulis/<int:penulis_id>", methods=["GET"])
def get_penulis_by_id(penulis_id):
    penulis = PenulisService.get_penulis_by_id(penulis_id)
    if not penulis:
        return jsonify({"message": "Penulis not found"}), 404
    return jsonify(penulis.to_dict())

@penulis_routes.route("/penulis", methods=["POST"])
def create_penulis():
    data = request.get_json()
    if "nama_penulis" not in data:
        return jsonify({"message": "Name of the author is required"}), 400

    new_penulis = PenulisService.add_penulis(data)
    return jsonify(new_penulis.to_dict()), 201

@penulis_routes.route("/penulis/<int:penulis_id>", methods=["PUT"])
def update_penulis(penulis_id):
    data = request.get_json()
    updated_penulis = PenulisService.update_penulis(penulis_id, data)
    if not updated_penulis:
        return jsonify({"message": "Penulis not found"}), 404
    return jsonify(updated_penulis.to_dict())

@penulis_routes.route("/penulis/<int:penulis_id>", methods=["DELETE"])
def delete_penulis(penulis_id):
    deleted_penulis_id = PenulisService.delete_penulis(penulis_id)
    if not deleted_penulis_id:
        return jsonify({"message": "Penulis not found"}), 404
    return jsonify({"message": f"Penulis {deleted_penulis_id} deleted successfully"}), 200
