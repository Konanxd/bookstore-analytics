from app.models.book import Buku
from app.utils.database import db

class BookService():
    @staticmethod
    def get_all_books():
        return Buku.query.all()
    
    @staticmethod
    def get_book_by_id(book_id):
        return Buku.query.get(book_id)
    
    @staticmethod
    def add_book(data):
        new_book = Buku(
            judul=data['judul'],
            isbn=data['isbn'],
            penulis=data['penulis'],
            penerbit=data['penerbit'],
            tahun_terbit=data['tahun_terbit'],
            genre=data['genre'],
            harga=data['harga'],
            stok=data['stok'],
        )

        db.session.add(new_book)
        db.session.commit()
        return new_book
    
    @staticmethod
    def update_book(book_id, data):
        book = Buku.query.get(book_id)
        if not book:
            return None

        book.judul = data.get('judul', book.judul)
        book.isbn = data.get('isbn', book.isbn)
        book.penulis = data.get('penulis', book.penulis)
        book.penerbit = data.get('penerbit', book.penerbit)
        book.tahun_terbit = data.get('tahun_terbit', book.tahun_terbit)
        book.genre = data.get('genre', book.genre)
        book.harga = data.get('harga', book.harga)
        book.stok = data.get('stok', book.stok)

        db.session.commit()

        return book
    
    @staticmethod
    def delete_book(book_id):
        book = Buku.query.get(book_id)
        if not book:
            return None
        
        db.session.delete(book)
        db.session.commit()

        return book_id