export default function BookListPage() {
  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">书籍列表</h1>
        <div className="flex gap-2">
          <select className="px-3 py-2 border rounded-md">
            <option value="">全部分类</option>
            <option value="programming">编程开发</option>
            <option value="design">设计创意</option>
            <option value="business">商业管理</option>
            <option value="novel">小说文学</option>
          </select>
          <select className="px-3 py-2 border rounded-md">
            <option value="recent">最新上架</option>
            <option value="popular">热门畅销</option>
            <option value="price-low">价格从低到高</option>
            <option value="price-high">价格从高到低</option>
          </select>
        </div>
      </div>
      <p className="text-muted-foreground">书籍列表页面开发中...</p>
    </div>
  )
}