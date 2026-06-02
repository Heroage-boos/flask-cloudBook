from flask_sqlalchemy.extension import SQLAlchemy
from flask_sqlalchemy import SQLAlchemy

db: SQLAlchemy = SQLAlchemy()


class Book(db.Model):
    __tablename__ = 'book'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(50), nullable=False)
    author = db.Column(db.String(30), default='未名')
    binding = db.Column(db.String(20))
    publisher = db.Column(db.String(50))
    price = db.Column(db.String(20))
    image = db.Column(db.String(50))
    summary = db.Column(db.String(100))
    isbn = db.Column(db.String(13))

    def sample(self):
        return {
            "id": self.id,
            "title": self.title,
            "author": self.author,
            "binding": self.binding,
            "publisher": self.publisher,
            "price": self.price,
            "image": self.image,
            "summary": self.summary,
            "isbn": self.isbn
        }