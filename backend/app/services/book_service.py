from app.models.book import Book
from app.utils.database import db

class BookService():
    @staticmethod
    def get_all_book():
        return Book.query.all()
    
    # @staticmethod
    # def add_book(data):
    #     new_book = Book(

    #     )