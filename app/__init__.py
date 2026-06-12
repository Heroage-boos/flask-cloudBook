from flask import Flask
from app.models.base import db
# from app.models import book,user, book_list
from flask_login import LoginManager

login_manager = LoginManager()

# 创建app
def create_app():
    app = Flask(__name__)

    app.config.from_object('config')

    register_blueprints(app)

    # 初始化db
    db.init_app(app)

    # 初始化login_manager
    login_manager.init_app(app)

    # 创建表
    with app.app_context():
        db.create_all()

    return app

# 注册蓝图
def register_blueprints(app):
    from .web import web
    # from .api.book import api
    app.register_blueprint(web)
    # app.register_blueprint(api)