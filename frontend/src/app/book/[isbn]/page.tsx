"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, BookOpen, ShoppingCart, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { api, type Book } from "@/lib/api"

function DetailSkeleton() {
  return (
    <div className="container py-8">
      <Skeleton className="h-6 w-20 mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
        <Skeleton className="aspect-[3/4] rounded-xl" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-6 w-24" />
          <div className="flex gap-3 pt-4">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
          <Skeleton className="h-32 w-full mt-6" />
        </div>
      </div>
    </div>
  )
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < Math.round(rating)
              ? "fill-yellow-400 text-yellow-400"
              : "fill-muted-foreground/20 text-muted-foreground/20"
          }`}
        />
      ))}
      <span className="text-sm text-muted-foreground ml-1">{rating.toFixed(1)}</span>
    </span>
  )
}

export default function BookDetailPage() {
  const params = useParams()
  const router = useRouter()
  const isbn = params.isbn as string

  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isbn) return
    const fetchBook = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await api.books.detail(isbn)
        if (data && data.id) {
          setBook(data)
        } else {
          setBook(null)
        }
      } catch (err) {
        console.error("Failed to fetch book detail:", err)
        setError("获取书籍信息失败，请稍后重试")
      } finally {
        setLoading(false)
      }
    }
    fetchBook()
  }, [isbn])

  if (loading) {
    return <DetailSkeleton />
  }

  if (error) {
    return (
      <div className="container py-20 flex flex-col items-center justify-center text-center">
        <BookOpen className="h-16 w-16 text-muted-foreground/30 mb-4" />
        <p className="text-lg font-medium text-muted-foreground mb-2">{error}</p>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />返回
          </Button>
          <Button onClick={() => { setError(null); setLoading(true); router.refresh() }}>
            重试
          </Button>
        </div>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="container py-20 flex flex-col items-center justify-center text-center">
        <BookOpen className="h-16 w-16 text-muted-foreground/30 mb-4" />
        <p className="text-lg font-medium text-muted-foreground mb-2">未找到该书籍</p>
        <p className="text-sm text-muted-foreground/70 mb-6">书籍可能已被移除或链接无效</p>
        <Button variant="outline" asChild>
          <Link href="/book">
            <ArrowLeft className="h-4 w-4" />返回书籍列表
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <Link
        href="/book"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        返回书籍列表
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8">
        <div className="flex justify-center md:justify-start">
          <Card className="overflow-hidden w-full max-w-[320px]">
            <div className="aspect-[3/4] bg-muted relative">
              {book.image ? (
                <img
                  src={book.image.large || book.image.thumbnail}
                  alt={book.title}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <BookOpen className="h-20 w-20 text-muted-foreground/20" />
                </div>
              )}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{book.title}</h1>
            <p className="text-lg text-muted-foreground mt-2">{book.author}</p>
          </div>

          {book.rating && <RatingStars rating={book.rating} />}

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-primary">¥{book.price}</span>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="default" size="lg">
              <ShoppingCart className="h-5 w-5" />
              加入购物车
            </Button>
            <Button variant="outline" size="lg">
              立即购买
            </Button>
          </div>

          <Card>
            <CardContent className="p-5">
              <h2 className="font-semibold mb-3">书籍信息</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8 text-sm">
                <InfoRow label="作者" value={book.author} />
                <InfoRow label="出版社" value={book.publisher} />
                <InfoRow label="装帧" value={book.binding} />
                <InfoRow label="ISBN" value={book.isbn} />
              </div>
            </CardContent>
          </Card>

          {book.summary && (
            <Card>
              <CardContent className="p-5">
                <h2 className="font-semibold mb-3">内容简介</h2>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {book.summary}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null
  return (
    <div>
      <span className="text-muted-foreground">{label}：</span>
      <span className="text-foreground">{value}</span>
    </div>
  )
}