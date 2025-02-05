from app.models.pesanan import Pesanan
from app.utils.database import db

class PesananService:

    @staticmethod
    def create_pesanan(data):
        new_pesanan = Pesanan(
            id_pelanggan=data['id_pelanggan'],
            id_buku=data['id_buku'],
            jumlah_pesanan=data['jumlah_pesanan']
        )
        db.session.add(new_pesanan)
        db.session.commit()
        return new_pesanan

    @staticmethod
    def get_all_pesanan():
        return Pesanan.query.all()

    @staticmethod
    def get_pesanan_by_id(id_pesanan):
        return Pesanan.query.get(id_pesanan)

    @staticmethod
    def update_pesanan(id_pesanan, data):
        pesanan = Pesanan.query.get(id_pesanan)
        if pesanan:
            pesanan.id_pelanggan = data['id_pelanggan']
            pesanan.id_buku = data['id_buku']
            pesanan.jumlah_pesanan = data['jumlah_pesanan']
            db.session.commit()
            return pesanan
        return None

    @staticmethod
    def delete_pesanan(id_pesanan):
        pesanan = Pesanan.query.get(id_pesanan)
        if pesanan:
            db.session.delete(pesanan)
            db.session.commit()
            return True
        return False
