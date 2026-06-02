
def is_isbn_or_keyword(q):
    returned = 'isbn'
     # isbn搜索 10位或者13位的ISBN码
    if len(q) in [10, 13] and q.isdigit():
        return returned
    # 关键字搜索
    else:
        returned = 'key'
        return returned