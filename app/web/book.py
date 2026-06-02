from flask import jsonify

from app.libs.helper import is_isbn_or_keyword
from app.spider.book import BookSpider

import json

from . import web
from app.view_models.book import BookViewModel, BookCollection

# 同一个接口区分关键字搜索orisbn搜索
@web.route('/book/search/<q>')
def search(q):
    text_p = is_isbn_or_keyword(q)

    books =  BookSpider(q)
    book_collection = BookCollection()
    if text_p == 'isbn':
        # 爬取数据，返回数据
        books.isbn_search(q)
        # 存入数据库，并返回数据
        # return jsonify(resulted)
    elif text_p == 'key':
        # 爬取数据，返回数据
        books.keyword_search(q)

    # 返回前端需要的数据，书籍信息，总数，关键字
    book_collection.collect_book(books,q)

     # 存入数据库，并返回数据
    return json.dumps(obj=book_collection,default=lambda o:o.__dict__)