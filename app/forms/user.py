from wtforms import Form,StringField, PasswordField, SubmitField, ValidationError
from wtforms.validators import DataRequired, Email, Length
from app.models.user import User

class Login(Form):
    nickname = StringField("nickname", validators=[DataRequired()])
    password = PasswordField("password", validators=[DataRequired()])
    submit = SubmitField("Login")

class RegisterForm(Form):
    email = StringField("email", validators=[DataRequired(),Length(min=8, max=64),Email(message="电子邮箱地址不符合规范!")])
    nickname = StringField("nickname", validators=[DataRequired(message="至少2个字符，最多10个字符！"),Length(min=2, max=10)])
    password = PasswordField("password", validators=[DataRequired(message="密码不可以为空，请输入你的密码！"),Length(min=6, max=32)])
    submit = SubmitField("register")

    # 自定义验证器
    def validate_email(self, field):
        # 检查用户名是否已经存在 User类需要你自己定义
        if User.query.filter_by(email=field.data).first():
            raise ValidationError("该邮箱已经被注册")

    def validate_nickname(self, field):
        if User.query.filter_by(nickname=field.data).first():
            raise ValidationError("昵称已存在")  # ValidationError 错误信息会被注册到form表单类的实例中