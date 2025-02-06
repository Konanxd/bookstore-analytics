from app.utils.database import db

class Penulis(db.Model):
    __tablename__ = 'penulis'

    id_penulis = db.Column(db.Integer, primary_key=True)
    nama_penulis = db.Column(db.String(255), nullable=True)

    def to_dict(self):
        return {
            'id_penulis': self.id_penulis,
            'nama_penulis': self.nama_penulis
        }