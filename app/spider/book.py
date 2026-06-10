
from app.libs.http_helper import HTTP

class BookSpider:
    """spider for book"""
    # 根据isbn搜书 返回单本书
    isbn_url = "http://t.talelin.com/v2/book/isbn/{}"
    # 根据id搜书 返回单本书
    id_url = "http://t.talelin.com/v2/book/{}"
    # 根据关键字搜书 返回集合
    keyword_url = "http://t.talelin.com/v2/book/search?q={}&&start={}&count={}"
    
    def __init__(self, data):
        self.books = []
        self.total = ""

    def __single__(self, data):
        if data :
            self.total = 1
            self.books.append(data)

    def __collection__(self, data):
        print('collection',data)
        self.books = data['books']
        self.total = data['total']
    
    def isbn_search(self, isbn):
        # 拼接url
        url = BookSpider.isbn_url.format(isbn)
        # 获取数据
        r = HTTP.get(url.format(isbn))
        # 填充到对象
        self.__single__(r)
    
    def id_search(self, book_id):
        url = BookSpider.id_url.format(book_id)
        r = HTTP.get(url)
        self.__single__(r)

    def keyword_search(self, keyword, start=1, count=15):
        url = BookSpider.keyword_url.format(keyword, start, count)
        # 获取数据
        r = HTTP.get(url)
        # 填充到对象
        self.__collection__(r)
