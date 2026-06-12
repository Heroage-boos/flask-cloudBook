from sqlalchemy.sql.schema import Column


from typing import Required

from flask import request
from sqlalchemy import Column, Integer, String
from werkzeug.security import check_password_hash, generate_password_hash
# from app.models.base import db
from app import login_manager
from app.models.base import db, Base

from flask_login import UserMixin

# class User(db.Model):
class User(UserMixin,Base):
    id = Column(Integer, primary_key=True,autoincrement=True)
    name = Column(String(256),default= '无名之辈xxx')
    nickname = Column(String(256))
    phone_number: Column[str] = Column(String(11), unique=True)
    email = Column(String(256), unique=True)

    # 用户密码在数据库中保存不能使用明文，所以需要对密码进行加密
    # password = Column(String(length=256), default = "ceshi123123", nullable=False)
    _password = Column('password',String(length=256), nullable=True)

    # 属性的set
    @property
    def password(self):
        return self._password

    # 属性的setter
    @password.setter
    def password(self,raw):
        self._password = generate_password_hash(raw)    

    # 用户输入的密码和原始密码进行比对   
    def check_password(self, raw):  # raw为明文
        result = check_password_hash(self._password, raw)
        return result
    
    # flask_login 需要用此方法，默认使用用户id
    # 用户登录后，需要从session中获取用户id，所以需要定义该方法，名称不能更改
    # 上面继承了UserMixin，已经包含了该方法，所以可以省略
    # def get_id(self):
    #     return self.id

# 用户加载器, 该方法会载入用户,
@login_manager.user_loader
def get_user(uid:int) :
    # 通过id查询用户  查询主键（唯一的）使用query.get()
    user = User.query.get(ident=int(uid))
    return user
