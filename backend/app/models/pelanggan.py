from app.utils.database import db

class Pelanggan(db.Model):
    __tablename__ = 'pelanggan'

    id_pelanggan = db.Column(db.Integer, primary_key=True)
    nama_pelanggan = db.Column(db.String(255))
    no_hp = db.Column(db.String(13))
    alamat_pelanggan = db.Column(db.String(255))
    
    def to_dict(self):
        return {
            'id_pelanggan': self.id_pelanggan,
            'nama_pelanggan': self.nama_pelanggan,
            'no_hp': self.no_hp,
            'alamat_pelanggan': self.alamat_pelanggan,
        }