from app.utils.database import db
from app.models.genre import Genre
from app.models.buku import Buku
from app.models.buku import Buku
from app.models.pesanan import Pesanan
from sqlalchemy.sql import func

class AnalyticsService:
    @staticmethod
    def get_total_books():
        total_books = (
            db.session.query(
                func.count(Buku.id_buku)
            )
        )

        return [{"total_books":total_books}]

    @staticmethod
    def get_total_revenue():
        total_revenue = (
            db.sessions.query(
                func.sum(Buku.harga * Buku.stok).scalar()
            )
        )

        return [{"total_revenue":total_revenue}]

    @staticmethod
    def get_top_genres(limit):
        top_genres = (
            db.session.query(
                Genre.nama_genre,
                func.sum(Pesanan.jumlah).label('total_sold')
            )
            .join(Buku, Pesanan.id_buku == Buku.id_buku)
            .join(Genre, Buku.id_genre == Genre.id_genre)
            .group_by(Genre.nama_genre)
            .order_by(('total_sold').desc())
            .limit(limit)
            .all()
        )

        return [
            {"nama_genre": genre.nama_genre, "total_sold": genre.total_sold}
            for genre in top_genres
        ]
    
    def get_stock_genres():
        genre_stock = (
            db.session.query(
                Genre.nama_genre,
                func.sum(Buku.stok).label('total_stock')
            )
            .join(Genre, Buku.id_genre == Genre.id_genre)
            .group_by(Genre.nama_genre)
            .order_by(func.sum(Buku.stok).desc())
            .all()
        )

        return [
            {"nama_genre": genre.nama_genre, "total_stock": genre.total_stock}
            for genre in genre_stock
        ]
        
    @staticmethod    
    def get_best_selling_books(limit=5):
        best_sellers = (
            db.session.query(
                Buku.id_buku, 
                Buku.judul, 
                func.sum(Pesanan.jumlah_pesanan).label("total_penjualan")
            )
            .join(Pesanan, Buku.id_buku == Pesanan.id_buku)
            .group_by(Buku.id_buku, Buku.judul)
            .order_by(func.sum(Pesanan.jumlah_pesanan).desc())
            .limit(limit)
            .all()
        )

        return [
            {"id_buku": book.id_buku, "judul": book.judul, "total_penjualan": book.total_penjualan}
            for book in best_sellers
        ]
