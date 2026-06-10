from typing import Required

from flask import request
from sqlalchemy import Column, Integer, String
from werkzeug.security import generate_password_hash
# from app.models.base import db
from app.models.base import db, Base

# class User(db.Model):
class User(Base):
    id = Column(Integer, primary_key=True,autoincrement=True)
    name = Column(String(256),default= '无名之辈xxx')
    nickname = Column(String(256))
    phone_number = Column(String(11), unique=True)
    email = Column(String(256), unique=True)

    # 用户密码在数据库中保存不能使用明文，所以需要对密码进行加密
    # password = Column(String(length=256), default = "ceshi123123", nullable=False)
    _password = Column('password',String(length=256), nullable=False)

    # 属性的set
    @property
    def password(self):
        return self._password

    # 属性的setter
    @password.setter
    def password(self,raw):
        self._password = generate_password_hash(raw)    
    
