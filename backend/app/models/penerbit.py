from app.utils.database import db

class Penerbit(db.Model):
    __tablename__ = 'penerbit'

    id_penerbit = db.Column(db.Integer, primary_key=True)
    nama_penerbit = db.Column(db.String(255), nullable=True)

    def to_dict(self):
        return {
            'id_penerbit': self.id_penerbit,
            'nama_penerbit': self.penerbit
        }