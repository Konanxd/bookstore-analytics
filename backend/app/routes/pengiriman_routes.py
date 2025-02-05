from flask import Blueprint, request, jsonify
from app.services.pengiriman_service import PengirimanService

pengiriman_routes = Blueprint('pengiriman_routes', __name__)

@pengiriman_routes.route("/pengiriman", methods=["POST"])
def create_pengiriman():
    data = request.get_json()
    new_pengiriman = PengirimanService.create_pengiriman(data)
    return jsonify(new_pengiriman.to_dict()), 201

@pengiriman_routes.route("/pengiriman", methods=["GET"])
def get_all_pengiriman():
    pengiriman_list = PengirimanService.get_all_pengiriman()
    return jsonify([pengiriman.to_dict() for pengiriman in pengiriman_list]), 200

@pengiriman_routes.route("/pengiriman/<int:id_pengiriman>", methods=["GET"])
def get_pengiriman_by_id(id_pengiriman):
    pengiriman = PengirimanService.get_pengiriman_by_id(id_pengiriman)
    if pengiriman:
        return jsonify(pengiriman.to_dict()), 200
    return jsonify({"error": "Pengiriman not found"}), 404

@pengiriman_routes.route("/pengiriman/<int:id_pengiriman>", methods=["PUT"])
def update_pengiriman(id_pengiriman):
    data = request.get_json()
    updated_pengiriman = PengirimanService.update_pengiriman(id_pengiriman, data)
    if updated_pengiriman:
        return jsonify(updated_pengiriman.to_dict()), 200
    return jsonify({"error": "Pengiriman not found"}), 404

@pengiriman_routes.route("/pengiriman/<int:id_pengiriman>", methods=["DELETE"])
def delete_pengiriman(id_pengiriman):
    success = PengirimanService.delete_pengiriman(id_pengiriman)
    if success:
        return jsonify({"message": "Pengiriman deleted successfully"}), 200
    return jsonify({"error": "Pengiriman not found"}), 404
