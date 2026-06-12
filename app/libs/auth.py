from functools import wraps

from flask import current_app, jsonify, request
from flask_login import current_user


def auth_required(fn):
    """前后端分离场景下的登录校验装饰器

    未登录时返回 JSON {code: -1, message: "请先登录"} + HTTP 401，
    而非 Flask-Login 默认的 302 重定向（AJAX 无法处理重定向）。
    """
    @wraps(fn)
    def wrapper(*args, **kwargs):
        if not current_user.is_authenticated:
            return jsonify({
                "code": -401,
                "message": "请先登录",
                "data": None,
            }), 401
        return fn(*args, **kwargs)
    return wrapper
