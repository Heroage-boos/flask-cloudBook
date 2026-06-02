
# 裁剪单本书，只保留前端需要的字段，并格式化数据

# 将单本书转换为字典 ，提取公共值

class BookViewModel:
    def __init__(self, book):
        self.id = book['id']
        self.title = book['title']
        self.author = book['author']
        self.binding = book['binding']
        self.publisher = book['publisher']
        self.price = book['price']
        self.image = book['images']
        self.summary = book['summary']
        self.isbn = book['isbn']
    
# 书的集合ViewModel
class BookCollection:
    def __init__(self):
        self.books = []
        self.total = 0
        self.keyword = ''
    
    # 将book对象转为BookViewModel
    def collect_book(self, books_info, keyword=""):
        self.total = books_info.total
        self.keyword = keyword
        # 推导式获取book列表，每本书都是BookViewModel对象
        self.books: list[BookViewModel] = [BookViewModel(b) for b in books_info.books]

    
