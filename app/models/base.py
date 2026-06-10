from sqlalchemy import Column, Integer, DateTime
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db: SQLAlchemy = SQLAlchemy()

# 抽象基类：提供所有子模型共享的字段，不映射到真实表
class Base(db.Model):
    __abstract__ = True  # 表示这是一个抽象类，不能被实例化(不创建base表)
    created_at = Column(DateTime, default=datetime.now)
    status = Column(Integer, default=1)

    def set_attrs(self, attrs_dict):
        for k, v in attrs_dict.items():
            # 判断实例是否有该属性，且不是id
            if hasattr(self, k) and k != 'id':
                # 设置属性值
                setattr(self, k, v)