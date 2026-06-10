from flask import jsonify, request

from app.libs.helper import is_isbn_or_keyword
from app.spider.book import BookSpider

import json

from . import web
from app.view_models.book import BookViewModel, BookCollection
from app.forms.book import SearchFrom

# 同一个接口区分关键字搜索orisbn搜索
@web.route("/api/book/search")
def search() -> str:
    form = SearchFrom(request.form)
    if form.validate():
        q: str = request.args.get("q", "")

        text_p = is_isbn_or_keyword(q)

        books = BookSpider(q)
        book_collection = BookCollection()
        if text_p == "isbn":
            # 爬取数据，返回数据
            books.isbn_search(q)
            # 存入数据库，并返回数据
            # return jsonify(resulted)
        elif text_p == "key":
            # 爬取数据，返回数据
            books.keyword_search(q)

        # 返回前端需要的数据，书籍信息，总数，关键字
        book_collection.collect_book(books, keyword=q)
        # print('book_collection',book_collection)

        # 存入数据库，并返回数据
        return json.dumps(obj=book_collection, default=lambda o: o.__dict__)
    else:
        return jsonify({"msg": "参数错误"})


@web.route("/api/book/details/<isbn>")
def book_detail(isbn):
    book = BookSpider(isbn)
    book.isbn_search(isbn)
    book_model = BookViewModel(book=book.books[0])
    return json.dumps(obj=book_model, default=lambda o: o.__dict__)
