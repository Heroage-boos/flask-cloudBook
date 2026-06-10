from sqlalchemy import Boolean, Column,Integer,ForeignKey,String
from sqlalchemy.orm import relationship
from app.models.base import db, Base

# class BookList(db.Model):
class BookList(Base): # 因为Base继承了db.Model，所以直接继承base就继承了db.Model+Base
    id = Column(Integer, primary_key=True, autoincrement=True)
    user =  relationship('User')
    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)
    list_name = Column(String(100), nullable=False)
    is_public = Column(Boolean, default=False)