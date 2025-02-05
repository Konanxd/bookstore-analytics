# app/services/pelanggan_service.py
from app.models.pelanggan import Pelanggan
from app.utils.database import db

class PelangganService:
    
    @staticmethod
    def create_pelanggan(data):
        new_pelanggan = Pelanggan(
            nama_pelanggan=data['nama_pelanggan'],
            no_hp=data['no_hp'],
            alamat_pelanggan=data['alamat_pelanggan']
        )
        db.session.add(new_pelanggan)
        db.session.commit()
        return new_pelanggan

    @staticmethod
    def get_all_pelanggan():
        return Pelanggan.query.all()

    @staticmethod
    def get_pelanggan_by_id(id_pelanggan):
        return Pelanggan.query.get(id_pelanggan)

    @staticmethod
    def update_pelanggan(id_pelanggan, data):
        pelanggan = Pelanggan.query.get(id_pelanggan)
        if pelanggan:
            pelanggan.nama_pelanggan = data['nama_pelanggan']
            pelanggan.no_hp = data['no_hp']
            pelanggan.alamat_pelanggan = data['alamat_pelanggan']
            db.session.commit()
            return pelanggan
        return None

    @staticmethod
    def delete_pelanggan(id_pelanggan):
        pelanggan = Pelanggan.query.get(id_pelanggan)
        if pelanggan:
            db.session.delete(pelanggan)
            db.session.commit()
            return True
        return False
