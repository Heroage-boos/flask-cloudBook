from wtforms import Form, StringField, PasswordField, SubmitField, ValidationError
from wtforms.validators import DataRequired, Email, Length, EqualTo
from app.models.user import User

class Login(Form):
    email = StringField("email", validators=[Length(8, 64), DataRequired(), Email("电子邮箱地址不符合规范!")])
    password = PasswordField("password", validators=[DataRequired(message="密码不可以为空，请输入你的密码！"), Length(min=6, max=32)])
    submit = SubmitField("Login")

class RegisterForm(Form):
    email = StringField("email", validators=[DataRequired(), Length(min=8, max=64), Email(message="电子邮箱地址不符合规范!")])
    nickname = StringField("nickname", validators=[DataRequired(), Length(min=2, max=10, message="至少2个字符，最多10个字符！")])
    password = PasswordField("password", validators=[DataRequired(message="密码不可以为空，请输入你的密码！"), Length(min=6, max=32)])
    submit = SubmitField("register")

class ResetPwdForm(Form):
    email = StringField("email", validators=[DataRequired(), Email(message="电子邮箱地址不符合规范!")])
    old_password = PasswordField("old_password", validators=[DataRequired(message="原密码不能为空")])
    new_password = PasswordField("new_password", validators=[
        DataRequired(message="新密码不能为空"),
        Length(min=6, max=32, message="密码长度为6-32位"),
    ])
    confirm_password = PasswordField("confirm_password", validators=[
        DataRequired(message="确认密码不能为空"),
        EqualTo("new_password", message="两次输入的密码不一致"),
    ])
    submit = SubmitField("reset_pwd")

    def validate_email(self, field):
        user = User.query.filter_by(email=field.data).first()
        if not user:
            raise ValidationError("该邮箱未注册")

    def validate_old_password(self, field):
        email = self.email.data
        if email:
            user = User.query.filter_by(email=email).first()
            if user and not User.check_password(user, field.data):
                raise ValidationError("原密码错误")