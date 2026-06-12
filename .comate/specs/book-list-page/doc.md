# 书籍列表页面（Book List Page）

## 需求场景

用户从首页"浏览书籍"、Header 搜索框回车、或直接访问 `/book` 进入书籍列表页。页面需要：
1. 展示书籍网格列表（封面、标题、作者、价格）
2. 支持通过 URL 搜索参数（`?q=关键词`）加载搜索结果
3. 支持分类筛选和排序
4. 加载骨架屏 + 空状态处理
5. 点击书籍卡片跳转详情页

## 技术方案

### 架构

- **客户端组件**（`"use client"`）：需要 useState/useEffect 管理数据获取和交互状态
- **数据来源**：调用 `api.books.list(params)` 请求后端 Flask API
- **URL 同步**：使用 `useSearchParams()` 读取 URL 查询参数，支持搜索关键词同步到 URL
- **样式**：复用现有 Card/Skeleton/Button 组件 + Tailwind CSS

### 数据流

```
URL ?q=xxx → useSearchParams() → api.books.list({q}) → 渲染书籍网格
                                        ↓
                              加载中 → Skeleton 骨架屏
                              成功   → BookCard 列表
                              失败   → 错误提示
                              空结果 → 空状态提示
```

### API 响应格式（后端已定义）

```json
{
  "books": [
    {
      "id": 1,
      "title": "书名",
      "author": "作者",
      "price": "29.90",
      "image": "https://...",
      "publisher": "出版社",
      "binding": "精装",
      "summary": "简介",
      "isbn": "978..."
    }
  ],
  "total": 100,
  "keyword": "搜索词"
}
```

## 影响文件

| 文件 | 操作类型 | 路径 | 说明 |
|---|---|---|---|
| BookListPage | 重写 | `frontend/src/app/book/page.tsx` | 核心文件，从占位符改为完整功能 |
| Header | 小改 | `frontend/src/components/Header.tsx` | 搜索后跳转到 /book?q=xxx |
| api.ts | 不变 | `frontend/src/lib/api.ts` | 复用已有 `api.books.list` |

## 实现细节

### 1. BookListPage 主组件 (`book/page.tsx`)

```tsx
"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { BookOpen, SearchX, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { api, type Book } from "@/lib/api"

export default function BookListPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""

  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState(initialQuery)
  const [total, setTotal] = useState(0)

  // 获取书籍列表
  const fetchBooks = useCallback(async (q: string) => {
    setLoading(true)
    try {
      const res = await api.books.list(q ? { q } : {})
      setBooks(res.books || [])
      setTotal(res.total || 0)
    } catch (err) {
      console.error("Failed to fetch books:", err)
      setBooks([])
    } finally {
      setLoading(false)
    }
  }, [])

  // 初始加载 & URL 参数变化时重新请求
  useEffect(() => {
    fetchBooks(query)
  }, [query, fetchBooks])

  // 搜索提交
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // 更新 URL 参数（可选），同时触发重新请求
    const newQuery = query.trim()
    if (newQuery) {
      window.history.pushState({}, "", `/book?q=${encodeURIComponent(newQuery)}`)
      fetchBooks(newQuery)
    }
  }

  return (
    <div className="container py-8">
      {/* 页面标题 + 搜索栏 */}
      <section>...</section>

      {/* 加载骨架屏 */}
      {loading && <BookGridSkeleton />}

      {/* 书籍网格 */}
      {!loading && books.length > 0 && (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-5">
          {books.map(book => <BookCard key={book.id} book={book} />)}
        </div>
      )}

      {/* 空状态 */}
      {!loading && books.length === 0 && query && (
        <EmptyState onClear={() => { setQuery(""); fetchBooks("") }} />
      )}
    </div>
  )
}
```

### 2. BookCard 子组件

```tsx
function BookCard({ book }: { book: Book }) {
  return (
    <Link href={`/book/${book.id}`}>
      <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
        {/* 封面图区域 - aspect-[3/4] 保持书籍比例 */}
        <div className="aspect-[3/4] bg-muted relative overflow-hidden">
          {book.image ? (
            <img src={book.image} alt={book.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen className="h-12 w-12 text-muted-foreground/30" />
            </div>
          )}
        </div>
        {/* 信息区 */}
        <CardContent className="p-3">
          <h3 className="font-medium text-sm line-clamp-1">{book.title}</h3>
          <p className="text-xs text-muted-foreground line-clamp-1">{book.author}</p>
          <p className="text-xs text-primary font-medium mt-1">¥{book.price}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
```

### 3. 骨架屏组件

```tsx
function BookGridSkeleton() {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-5">
      {Array.from({ length: 12 }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <Skeleton className="aspect-[3/4]" />
          <div className="p-3 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        </Card>
      ))}
    </div>
  )
}
```

### 4. Header 搜索联动修改

搜索回车后跳转到 `/book?q=关键词`：

```tsx
// Header.tsx handleSearch 中：
// 原来：console.log('query', res)
// 改为：window.location.href = `/book?q=${encodeURIComponent(query)}`
// 或用 router.push(`/book?q=${encodeURIComponent(query)}`)
```

## 边界条件与异常处理

| 场景 | 处理方式 |
|---|---|
| 无搜索词首次进入 | 展示全部书籍（或空状态） |
| 搜索无结果 | 显示空状态提示 + 清除按钮 |
| 图片加载失败 | fallback 显示 BookOpen 图标 |
| API 请求失败 | catch 中 console.error，显示空列表 |
| 快速连续搜索 | 每次 search 都会触发新的 fetch，自然覆盖旧结果 |
| URL 直接带 `?q=参数` | 通过 `useSearchParams()` 读取并自动触发搜索 |

## 预期效果

- 用户访问 `/book` 看到书籍网格或空状态
- 从 Header 搜索后自动跳转到 `/book?q=关键词` 并展示结果
- 加载过程有骨架屏动画
- 点击任意书籍卡片跳转到 `/book/[id]` 详情页
