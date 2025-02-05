from app.utils.database import db

class Buku(db.Model):
    __tablename__ = 'buku'

    id_buku = db.Column(db.Integer, primary_key=True)
    judul = db.Column(db.String(255), nullable=True)
    penulis = db.Column(db.String(255), nullable=True)
    isbn = db.Column(db.String(255), nullable=True)
    penerbit = db.Column(db.String(255), nullable=True)
    tahun_terbit = db.Column(db.Date, nullable=True)
    genre = db.Column(db.String(50), nullable=True)
    harga = db.Column(db.Integer, nullable=True)
    stok = db.Column(db.Integer, nullable=True)

    def to_dict(self):
        return {
            'id_buku': self.id_buku,
            'judul': self.judul,
            'isbn': self.isbn,
            'penerbit': self.penerbit,
            'tahun_terbit': self.tahun_terbit,
            'genre': self.genre,
            'harga': self.harga,
            'stok': self.stok
        }