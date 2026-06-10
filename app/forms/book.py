from wtforms import Form,StringField
from wtforms.validators import DataRequired

class SearchFrom(Form):
    p = StringField("p", validators=[DataRequired()])  # 搜索内容