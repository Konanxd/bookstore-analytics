from app.utils.database import db

class Buku(db.Model):
    __tablename__ = 'buku'

    id_buku = db.Column(db.Integer, primary_key=True)
    judul = db.Column(db.String(255), nullable=True)
    id_penulis = db.Column(db.Integer, db.ForeignKey('penulis.id_penulis'))  # Use correct column type
    isbn = db.Column(db.String(255), nullable=True)
    id_penerbit = db.Column(db.String(255), db.ForeignKey('penerbit.id_penerbit'))
    tahun_terbit = db.Column(db.Date, nullable=True)
    id_genre = db.Column(db.String(50), db.ForeignKey('genre.id_genre'))
    harga = db.Column(db.Integer, nullable=True)
    stok = db.Column(db.Integer, nullable=True)

    penulis = db.relationship('Penulis', backref='buku')  # Define relationship
    penerbit = db.relationship('Penerbit', backref='buku')
    genre = db.relationship('Genre', backref='buku')

    def to_dict(self):
        return {
            'id_buku': self.id_buku,
            'judul': self.judul,
            'id_penulis': self.penulis.nama_penulis, 
            'isbn': self.isbn,
            'id_penerbit': self.penerbit.nama_penerbit,
            'tahun_terbit': self.tahun_terbit.year if self.tahun_terbit else None,
            'id_genre': self.genre.nama_genre,
            'harga': self.harga,
            'stok': self.stok
        }
