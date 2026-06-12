"use client"

import { useState, useEffect, useCallback, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { BookOpen, SearchX } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { api, type Book } from "@/lib/api"

/* ========== BookCard 子组件 ========== */
function BookCard({ book }: { book: Book }) {
  return (
    <Link href={`/book/${book.isbn}`}>
      <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
        <div className="aspect-[3/4] bg-muted relative overflow-hidden">
          {book.image ? (
            <img
              src={book.image.large}
              alt={book.title}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen className="h-12 w-12 text-muted-foreground/30" />
            </div>
          )}
        </div>
        <CardContent className="p-3">
          <h3 className="font-medium text-sm line-clamp-1" title={book.title}>
            {book.title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-1" title={book.author}>
            {book.author}
          </p>
          <p className="text-xs text-primary font-medium mt-1">¥{book.price}</p>
        </CardContent>
      </Card>
    </Link>
  )
}

/* ========== 骨架屏组件 ========== */
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

/* ========== 空状态组件 ========== */
function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <SearchX className="h-16 w-16 text-muted-foreground/30 mb-4" />
      <p className="text-lg font-medium text-muted-foreground mb-2">未找到相关书籍</p>
      <p className="text-sm text-muted-foreground/70 mb-6">试试其他关键词吧</p>
      <Button variant="outline" onClick={onClear}>
        清除搜索
      </Button>
    </div>
  )
}

/* ========== 主页面组件 ========== */
function BookListContent() {
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
      setTotal(0)
    } finally {
      setLoading(false)
    }
  }, [])

  // 初始加载 & URL 参数变化时重新请求
  useEffect(() => {
    if (initialQuery) {
      fetchBooks(initialQuery)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 搜索提交
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const newQuery = query.trim()
    if (newQuery) {
      window.history.pushState({}, "", `/book?q=${encodeURIComponent(newQuery)}`)
      fetchBooks(newQuery)
    }
  }

  // 清除搜索
  const handleClear = () => {
    setQuery("")
    window.history.pushState({}, "", "/book")
    fetchBooks("")
  }

  return (
    <div className="container py-8">
      {/* 页面标题 + 搜索栏 */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">书籍列表</h1>
          {!loading && total > 0 && (
            <p className="text-sm text-muted-foreground mt-1">共 {total} 本书籍</p>
          )}
        </div>

        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索书籍..."
            className="w-64"
            enterKeyHint="search"
          />
          <Button type="submit" variant="default">
            搜索
          </Button>
        </form>
      </div>

      {/* 加载骨架屏 */}
      {loading && <BookGridSkeleton />}

      {/* 书籍网格 */}
      {!loading && books.length > 0 && (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-5">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}

      {/* 空状态 */}
      {!loading && books.length === 0 && query && (
        <EmptyState onClear={handleClear} />
      )}

      {/* 无搜索词且无数据时的默认提示 */}
      {!loading && books.length === 0 && !query && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <BookOpen className="h-16 w-16 text-muted-foreground/30 mb-4" />
          <p className="text-lg font-medium text-muted-foreground mb-2">输入关键词开始搜索</p>
          <p className="text-sm text-muted-foreground/70">在上方搜索框输入书名或作者</p>
        </div>
      )}
    </div>
  )
}

export default function BookListPage() {
  return (
    <Suspense fallback={<BookGridSkeleton />}>
      <BookListContent />
    </Suspense>
  )
}
