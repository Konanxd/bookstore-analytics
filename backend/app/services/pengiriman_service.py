from app.models.pengiriman import Pengiriman
from app.utils.database import db

class PengirimanService:

    @staticmethod
    def create_pengiriman(data):
        new_pengiriman = Pengiriman(
            id_pembayaran=data['id_pembayaran'],
            id_pesanan=data['id_pesanan'],
            id_pelanggan=data['id_pelanggan'],
            stat_pengiriman=data['stat_pengiriman'],
            no_res=data['no_res']
        )
        db.session.add(new_pengiriman)
        db.session.commit()
        return new_pengiriman

    @staticmethod
    def get_all_pengiriman():
        return Pengiriman.query.all()

    @staticmethod
    def get_pengiriman_by_id(id_pengiriman):
        return Pengiriman.query.get(id_pengiriman)

    @staticmethod
    def update_pengiriman(id_pengiriman, data):
        pengiriman = Pengiriman.query.get(id_pengiriman)
        if pengiriman:
            pengiriman.id_pembayaran = data['id_pembayaran']
            pengiriman.id_pesanan = data['id_pesanan']
            pengiriman.id_pelanggan = data['id_pelanggan']
            pengiriman.stat_pengiriman = data['stat_pengiriman']
            pengiriman.no_res = data['no_res']
            db.session.commit()
            return pengiriman
        return None

    @staticmethod
    def delete_pengiriman(id_pengiriman):
        pengiriman = Pengiriman.query.get(id_pengiriman)
        if pengiriman:
            db.session.delete(pengiriman)
            db.session.commit()
            return True
        return False
