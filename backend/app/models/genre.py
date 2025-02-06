from app.utils.database import db

class Genre(db.Model):
    __tablename__ = 'genre'

    id_genre = db.Column(db.Integer, primary_key=True)
    nama_genre = db.Column(db.String(255), nullable=True)

    def to_dict(self):
        return {
            'id_genre': self.id_genre,
            'nama_genre': self.nama_genre
        }