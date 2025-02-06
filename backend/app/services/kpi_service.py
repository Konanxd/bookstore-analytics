from app.utils.database import db
from app.services.analytics_service import AnalyticsService
from app.models.genre import Genre
from app.models.buku import Buku
from app.models.buku import Buku
from app.models.pesanan import Pesanan
from sqlalchemy.sql import func

class KPIService:
    @staticmethod
    def get_kpi_total_books():
        return {
            "total_books": AnalyticsService.get_total_books(),
            "total_revenue": AnalyticsService.get_total_revenue(),
            "top_genre": AnalyticsService.get_top_genres(1)
        }
    
    def get_genre_distribution():
        dataList = AnalyticsService.get_top_genres(5);
        
        return {
            {"nama_genre": genre.nama_genre, "total_sold": genre.total_sold}
            for genre in dataList
        }

    def get_stock_levels():
        dataList = AnalyticsService.get_stock_genres();
        
        return {
            {"nama_genre": genre.nama_genre, "total_stock": genre.total_stock}
            for genre in dataList
        }