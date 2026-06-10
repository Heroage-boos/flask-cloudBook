from flask import Flask
from app.models.base import db
# from app.models import book,user, book_list

# 创建app
def create_app():
    app = Flask(__name__)

    app.config.from_object('config')

    register_blueprints(app)

    # 初始化db
    db.init_app(app)
    with app.app_context():
        db.create_all()

    return app

# 注册蓝图
def register_blueprints(app):
    from .web import web
    # from .api.book import api
    app.register_blueprint(web)
    # app.register_blueprint(api)