# CloudBook - 云上书城

基于 Flask 的电子书电商平台，提供书籍搜索、电子书销售、在线阅读与下载功能。

## 功能模块

- 书籍搜索与发现
- 电子书商城
- 购物车与订单
- 在线阅读与下载
- 用户评价与收藏

## 技术栈

- **后端**: Flask + SQLAlchemy
- **数据库**: SQLite (开发) / PostgreSQL (生产)
- **前端**: Vue.js / HTML5

## 项目结构

```
flask-cloudBook/
├── app/
│   ├── libs/          # 工具类
│   ├── models/        # 数据模型
│   ├── spider/        # 爬虫
│   ├── view_models/   # 视图模型
│   └── web/           # Web 蓝图
├── docs/              # 文档
├── app.py             # 入口文件
└── config.py         # 配置文件
```

## 快速开始

```bash
# 安装依赖
pip install flask flask-sqlalchemy requests

# 运行项目
python app.py
```

访问 `http://localhost:82`

## 书籍 API

- [Open Library API](https://openlibrary.org/) - 免费书籍数据
- [Google Books API](https://developers.google.com/books) - 谷歌图书