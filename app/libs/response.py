from flask import jsonify


def success(data=None, message="操作成功"):
    return jsonify({"code": 0, "message": message, "data": data})


def fail(message="操作失败", data=None, code=-1, status=400):
    return jsonify({"code": code, "message": message, "data": data}), status
