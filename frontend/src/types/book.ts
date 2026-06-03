export interface Book {
  id: number
  title: string
  author: string
  binding?: string
  publisher?: string
  price: string
  image?: string
  summary?: string
  isbn?: string
  rating?: number
  reviewCount?: number
  category?: string
  tags?: string[]
}

export interface BookSearchParams {
  q?: string
  page?: number
  limit?: number
  category?: string
}