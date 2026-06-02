from flask import Flask
from app.models.book import db

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
    from .web.book import web
    app.register_blueprint(web)
