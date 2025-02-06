from app.models.genre import Genre
from app.utils.database import db

class GenreService():
    @staticmethod
    def get_all_genre():
        return Genre.query.all()
    
    @staticmethod
    def get_genre_by_id(genre_id):
        return Genre.query.get(genre_id)
    
    @staticmethod
    def add_genre(data):
        new_genre = Genre(
            id_genre=data['id_genre'],
            nama_genre=data['nama_genre'],
        )

        db.session.add(new_genre)
        db.session.commit()
        return new_genre
    
    @staticmethod
    def update_genre(genre_id, data):
        genre = Genre.query.get(genre_id)
        if not genre:
            return None

        genre.nama_genre = data.get('nama_genre', genre.nama_genre)

        db.session.commit()

        return genre
    
    @staticmethod
    def delete_genre(genre_id):
        genre = Genre.query.get(genre_id)
        if not genre:
            return None
        
        db.session.delete(genre)
        db.session.commit()

        return genre_id
