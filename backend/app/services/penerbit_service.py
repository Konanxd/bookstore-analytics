from app.models.penerbit import Penerbit
from app.utils.database import db

class PenerbitService():
    @staticmethod
    def get_all_penerbit():
        return Penerbit.query.all()
    
    @staticmethod
    def get_penerbit_by_id(penerbit_id):
        return Penerbit.query.get(penerbit_id)
    
    @staticmethod
    def add_penerbit(data):
        new_penerbit = Penerbit(
            nama_penerbit=data['nama_penerbit'],
        )

        db.session.add(new_penerbit)
        db.session.commit()
        return new_penerbit
    
    @staticmethod
    def update_penerbit(penerbit_id, data):
        penerbit = Penerbit.query.get(penerbit_id)
        if not penerbit:
            return None

        penerbit.nama_penerbit = data.get('nama_penerbit', penerbit.nama_penerbit)

        db.session.commit()

        return penerbit
    
    @staticmethod
    def delete_penerbit(penerbit_id):
        penerbit = Penerbit.query.get(penerbit_id)
        if not penerbit:
            return None
        
        db.session.delete(penerbit)
        db.session.commit()

        return penerbit_id
