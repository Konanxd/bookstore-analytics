from flask import Blueprint, request, jsonify
from app.services.pembayaran_service import PembayaranService

pembayaran_routes = Blueprint('pembayaran_routes', __name__)

@pembayaran_routes.route("/pembayaran", methods=["POST"])
def create_pembayaran():
    data = request.get_json()
    new_pembayaran = PembayaranService.create_pembayaran(data)
    return jsonify(new_pembayaran.to_dict()), 201

@pembayaran_routes.route("/pembayaran", methods=["GET"])
def get_all_pembayaran():
    pembayaran_list = PembayaranService.get_all_pembayaran()
    return jsonify([pembayaran.to_dict() for pembayaran in pembayaran_list]), 200

@pembayaran_routes.route("/pembayaran/<int:id_pembayaran>", methods=["GET"])
def get_pembayaran_by_id(id_pembayaran):
    pembayaran = PembayaranService.get_pembayaran_by_id(id_pembayaran)
    if pembayaran:
        return jsonify(pembayaran.to_dict()), 200
    return jsonify({"error": "Pembayaran not found"}), 404

@pembayaran_routes.route("/pembayaran/<int:id_pembayaran>", methods=["PUT"])
def update_pembayaran(id_pembayaran):
    data = request.get_json()
    updated_pembayaran = PembayaranService.update_pembayaran(id_pembayaran, data)
    if updated_pembayaran:
        return jsonify(updated_pembayaran.to_dict()), 200
    return jsonify({"error": "Pembayaran not found"}), 404

@pembayaran_routes.route("/pembayaran/<int:id_pembayaran>", methods=["DELETE"])
def delete_pembayaran(id_pembayaran):
    success = PembayaranService.delete_pembayaran(id_pembayaran)
    if success:
        return jsonify({"message": "Pembayaran deleted successfully"}), 200
    return jsonify({"error": "Pembayaran not found"}), 404
