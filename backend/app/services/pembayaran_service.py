from app.models.pembayaran import Pembayaran
from app.utils.database import db

class PembayaranService:

    @staticmethod
    def create_pembayaran(data):
        new_pembayaran = Pembayaran(
            id_pesanan=data['id_pesanan'],
            id_pelanggan=data['id_pelanggan'],
            total_pembayaran=data['total_pembayaran'],
            stat_bayar=data['stat_bayar']
        )
        db.session.add(new_pembayaran)
        db.session.commit()
        return new_pembayaran

    @staticmethod
    def get_all_pembayaran():
        return Pembayaran.query.all()

    @staticmethod
    def get_pembayaran_by_id(id_pembayaran):
        return Pembayaran.query.get(id_pembayaran)

    @staticmethod
    def update_pembayaran(id_pembayaran, data):
        pembayaran = Pembayaran.query.get(id_pembayaran)
        if pembayaran:
            pembayaran.id_pesanan = data['id_pesanan']
            pembayaran.id_pelanggan = data['id_pelanggan']
            pembayaran.total_pembayaran = data['total_pembayaran']
            pembayaran.stat_bayar = data['stat_bayar']
            db.session.commit()
            return pembayaran
        return None

    @staticmethod
    def delete_pembayaran(id_pembayaran):
        pembayaran = Pembayaran.query.get(id_pembayaran)
        if pembayaran:
            db.session.delete(pembayaran)
            db.session.commit()
            return True
        return False
