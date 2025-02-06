from flask import Blueprint, jsonify, request
from app.services.penerbit_service import PenerbitService

penerbit_routes = Blueprint('penerbit_routes', __name__)

@penerbit_routes.route('/penerbit', methods=['GET'])
def get_penerbit():
    penerbit = PenerbitService.get_all_penerbit()
    return jsonify([p.to_dict() for p in penerbit])

@penerbit_routes.route("/penerbit/<int:penerbit_id>", methods=["GET"])
def get_penerbit_by_id(penerbit_id):
    penerbit = PenerbitService.get_penerbit_by_id(penerbit_id)
    if not penerbit:
        return jsonify({"message": "Penerbit not found"}), 404
    return jsonify(penerbit.to_dict())

@penerbit_routes.route("/penerbit", methods=["POST"])
def create_penerbit():
    data = request.get_json()
    if "nama_penerbit" not in data:
        return jsonify({"message": "Name of the publisher is required"}), 400

    new_penerbit = PenerbitService.add_penerbit(data)
    return jsonify(new_penerbit.to_dict()), 201

@penerbit_routes.route("/penerbit/<int:penerbit_id>", methods=["PUT"])
def update_penerbit(penerbit_id):
    data = request.get_json()
    updated_penerbit = PenerbitService.update_penerbit(penerbit_id, data)
    if not updated_penerbit:
        return jsonify({"message": "Penerbit not found"}), 404
    return jsonify(updated_penerbit.to_dict())

@penerbit_routes.route("/penerbit/<int:penerbit_id>", methods=["DELETE"])
def delete_penerbit(penerbit_id):
    deleted_penerbit_id = PenerbitService.delete_penerbit(penerbit_id)
    if not deleted_penerbit_id:
        return jsonify({"message": "Penerbit not found"}), 404
    return jsonify({"message": f"Penerbit {deleted_penerbit_id} deleted successfully"}), 200
