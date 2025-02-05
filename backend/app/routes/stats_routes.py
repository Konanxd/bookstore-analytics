from flask import Blueprint, jsonify
from app.services.analytics_service import AnalyticsService

stats_routes = Blueprint("stats_routes", __name__)

@stats_routes.route("/analytics/best-selling-books", methods=["GET"])
def best_selling_books():
    books = AnalyticsService.get_best_selling_books()
    return jsonify(books)
