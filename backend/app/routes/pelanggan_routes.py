from flask import Blueprint, request, jsonify
from app.services.pelanggan_service import PelangganService

pelanggan_routes = Blueprint('pelanggan_routes', __name__)

@pelanggan_routes.route("/pelanggan", methods=["POST"])
def create_pelanggan():
    data = request.get_json()
    new_pelanggan = PelangganService.create_pelanggan(data)
    return jsonify(new_pelanggan.to_dict()), 201

@pelanggan_routes.route("/pelanggan", methods=["GET"])
def get_pelanggan():
    pelanggan_list = PelangganService.get_all_pelanggan()
    return jsonify([pelanggan.to_dict() for pelanggan in pelanggan_list]), 200

@pelanggan_routes.route("/pelanggan/<int:id_pelanggan>", methods=["GET"])
def get_pelanggan_by_id(id_pelanggan):
    pelanggan = PelangganService.get_pelanggan_by_id(id_pelanggan)
    if pelanggan:
        return jsonify(pelanggan.to_dict()), 200
    return jsonify({"error": "Pelanggan not found"}), 404

@pelanggan_routes.route("/pelanggan/<int:id_pelanggan>", methods=["PUT"])
def update_pelanggan(id_pelanggan):
    data = request.get_json()
    updated_pelanggan = PelangganService.update_pelanggan(id_pelanggan, data)
    if updated_pelanggan:
        return jsonify(updated_pelanggan.to_dict()), 200
    return jsonify({"error": "Pelanggan not found"}), 404

@pelanggan_routes.route("/pelanggan/<int:id_pelanggan>", methods=["DELETE"])
def delete_pelanggan(id_pelanggan):
    success = PelangganService.delete_pelanggan(id_pelanggan)
    if success:
        return jsonify({"message": "Pelanggan deleted successfully"}), 200
    return jsonify({"error": "Pelanggan not found"}), 404
