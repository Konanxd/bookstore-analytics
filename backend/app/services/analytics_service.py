from app.utils.database import db
from app.models.buku import Buku
from app.models.pesanan import Pesanan
from sqlalchemy.sql import func

class AnalyticsService:
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
