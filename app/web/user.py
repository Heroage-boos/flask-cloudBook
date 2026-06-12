


from flask import jsonify, make_response, redirect, request, url_for
from flask_login.utils import logout_user
from app.forms.user import RegisterForm, Login, ResetPwdForm
from app.models.base import db
from app.models.user import User
from . import web
from werkzeug.security import generate_password_hash
from app.libs.response import success,fail
from app.libs.auth import auth_required

from flask_login import login_required, login_user
 

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
         # return redirect(url_for('/login'))

         return success({
             "email": register_form.email.data,
             "nickname": register_form.nickname.data,
         }, "注册成功")
    else:
        return fail("参数校验失败", register_form.errors)
   
# 登录需要验证身份  cookie，有效期，其他和注册一样
@web.route('/api/user/login', methods=['POST'])
def login():
    # 校验登录参数
    login_form = Login(data=request.json)

    if login_form.validate():

        # 读取模型数据库查看数据
        user = User.query.filter_by(email=login_form.email.data).first()
        
        # 校验密码是否正确
        if user and User.check_password(user,login_form.password.data):
            # 登录成功，保存session  
            # 间接将cookie保存到浏览器  remember True会生成一个永久cookie(365天) 每次请求都会更新
            login_user(user, remember=True)  

            # next = request.args.get("next") #获取next参数 要跳转的页面
            # return redirect(url_for(next))

            # 生成token 并返回
            return success({"email": user.email, "nickname": user.nickname}, "登录成功")
        else:
            return fail("登录失败,用户名或密码错误！")
    else :
        return fail("登录失败,用户名或密码错误！")



# cookie 操作  应用场景：广告，记住登录，购物车，用户偏好设置，分析用户访问路径，是否第一次访问等
@web.route("/user/cookie")
def set_cookie():
    resp = make_response('Hello World')
    resp.set_cookie('name', 'zhangsan', 100) # 会话级别  持久化级别  set_cookie(名称，值，expires）
    return resp

# 如果是jinjia中控制使用 login_required
# 登录才能访问的接口 — 前后端分离用 @auth_required 返回 JSON 401
@web.route('/api/user/home')
@auth_required
def page_home():
    return success({"nickname": User.nickname, "email": User.email}, "已登录")

# 用户没有登录不能访问的
@web.route('/user/no_login')
def no_login():
    return "login page"

@web.route('/user/logout')
def logout():
    logout_user() # 会清空cookie
    return success({}, "退出成功")


# 重置用户密码 — 需要登录 + 验证原密码
@web.route('/api/user/reset_pwd', methods=['POST'])
@auth_required
def reset_pwd():
    form = ResetPwdForm(data=request.json)

    if not form.validate():
        return fail("参数校验失败", form.errors)

    user = User.query.filter_by(email=form.email.data).first()
    if not user:
        return fail("用户不存在")

    # 更新密码（通过 setter 自动加密）
    user.password = form.new_password.data
    db.session.commit()

    return success({}, "密码修改成功")