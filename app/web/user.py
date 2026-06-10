


from flask import jsonify, redirect, request, url_for
from app.forms.user import RegisterForm,Login
from app.models.base import db
from app.models.user import User
from . import web
from werkzeug.security import generate_password_hash
from app.libs.response import success,fail

@web.route('/api/user/register', methods=['GET','POST'])
def register():
    print ("request.args",request.args,request.form,request.json)
    # 获取参数 get获取
    # register_form = RegisterForm(formdata=request.args)
    # 数据在 JSON body 里使用 request.json
    register_form = RegisterForm(data=request.json)
    # 校验参数
    if request.method == 'POST' and register_form.validate():
         # 获取参数
         # 请求数据库查询数据
         user = User()
         # 包含客户端提交的数据，和User表的字段对应
         # 保存session
         user.set_attrs(register_form.data)

         #密码加密 1
         # user.password = generate_password_hash(register_form.password.data)
         # 加密方式2 通过getter 和 setter 在定义属性的时候就加密了，所以这里就不需要了

         # 存储到数据库
         db.session.add(user)
         db.session.commit()

         # 获取用户信息

         # 返回结果 如果是jinjia 模板的话，就返回index.html，如果是ajax请求，就返回json格式的数据
         # return render_template('index.html',form = register_form)
         
         # if 重定向到登录页 前后端分离的架构，后端不负责页面跳转 
         # 前端用 fetch 调 API，服务端 302 重定向不会让浏览器页面跳转
         #  redirect(url_for('/login'))

         return success(register_form,"注册成功!")
    else:
        return register_form.errors
   
# 登录需要验证身份
@web.route('/login', methods=['POST'])
def login():
    form = Login(request.json)
    
    
    return jsonify({})



