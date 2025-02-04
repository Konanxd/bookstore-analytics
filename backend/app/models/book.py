from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Book(db.Model):
    __tablename__ = 'books'

    id_buku = db.Column(db.Integer, primary_key=True)
    judul = db.Column(db.String(255), nullable=True)
    penulis = db.Column(db.String(255), nullable=True)
    isbn = db.Column(db.String(255), nullable=True)
    penerbit = db.Column(db.String(255), nullable=True)

    def to_dict(self):
        return {
            'id': self.id_buku,
            'judul': self.judul,
            'isbn': self.isbn,
            'penerbit': self.penerbit
        }