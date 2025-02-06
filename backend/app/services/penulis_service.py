from app.models.penulis import Penulis
from app.utils.database import db

class PenulisService():
    @staticmethod
    def get_all_penulis():
        return Penulis.query.all()
    
    @staticmethod
    def get_penulis_by_id(penulis_id):
        return Penulis.query.get(penulis_id)
    
    @staticmethod
    def add_penulis(data):
        new_penulis = Penulis(
            nama_penulis=data['nama_penulis'],
        )

        db.session.add(new_penulis)
        db.session.commit()
        return new_penulis
    
    @staticmethod
    def update_penulis(penulis_id, data):
        penulis = Penulis.query.get(penulis_id)
        if not penulis:
            return None

        penulis.nama_penulis = data.get('nama_penulis', penulis.nama_penulis)

        db.session.commit()

        return penulis
    
    @staticmethod
    def delete_penulis(penulis_id):
        penulis = Penulis.query.get(penulis_id)
        if not penulis:
            return None
        
        db.session.delete(penulis)
        db.session.commit()

        return penulis_id
