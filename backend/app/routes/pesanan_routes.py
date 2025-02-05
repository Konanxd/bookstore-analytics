from flask import Blueprint, request, jsonify
from app.services.pesanan_service import PesananService

pesanan_routes = Blueprint('pesanan_routes', __name__)

@pesanan_routes.route("/pesanan", methods=["POST"])
def create_pesanan():
    data = request.get_json()
    new_pesanan = PesananService.create_pesanan(data)
    return jsonify(new_pesanan.to_dict()), 201

@pesanan_routes.route("/pesanan", methods=["GET"])
def get_pesanan():
    pesanan_list = PesananService.get_all_pesanan()
    return jsonify([pesanan.to_dict() for pesanan in pesanan_list]), 200

@pesanan_routes.route("/pesanan/<int:id_pesanan>", methods=["GET"])
def get_pesanan_by_id(id_pesanan):
    pesanan = PesananService.get_pesanan_by_id(id_pesanan)
    if pesanan:
        return jsonify(pesanan.to_dict()), 200
    return jsonify({"error": "Pesanan not found"}), 404

@pesanan_routes.route("/pesanan/<int:id_pesanan>", methods=["PUT"])
def update_pesanan(id_pesanan):
    data = request.get_json()
    updated_pesanan = PesananService.update_pesanan(id_pesanan, data)
    if updated_pesanan:
        return jsonify(updated_pesanan.to_dict()), 200
    return jsonify({"error": "Pesanan not found"}), 404

@pesanan_routes.route("/pesanan/<int:id_pesanan>", methods=["DELETE"])
def delete_pesanan(id_pesanan):
    success = PesananService.delete_pesanan(id_pesanan)
    if success:
        return jsonify({"message": "Pesanan deleted successfully"}), 200
    return jsonify({"error": "Pesanan not found"}), 404
