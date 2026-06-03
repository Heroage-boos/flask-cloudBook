import { API_BASE_URL } from './constants'

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
}

export interface BookSearchParams {
  q?: string
  page?: number
  limit?: number
}

export const api = {
  books: {
    list: async (params: BookSearchParams = {}) => {
      const query = new URLSearchParams(params as Record<string, string>)
      const res = await fetch(`${API_BASE_URL}/api/books?${query}`)
      return res.json()
    },
    detail: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/api/books/${id}`)
      return res.json()
    },
  },
  user: {
    login: async (data: { email: string; password: string }) => {
      const res = await fetch(`${API_BASE_URL}/api/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      return res.json()
    },
    register: async (data: { email: string; password: string; nickname?: string }) => {
      const res = await fetch(`${API_BASE_URL}/api/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      return res.json()
    },
  },
  cart: {
    get: async () => {
      const res = await fetch(`${API_BASE_URL}/api/cart`)
      return res.json()
    },
    add: async (bookId: string) => {
      const res = await fetch(`${API_BASE_URL}/api/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId }),
      })
      return res.json()
    },
    remove: async (bookId: string) => {
      const res = await fetch(`${API_BASE_URL}/api/cart/${bookId}`, {
        method: 'DELETE',
      })
      return res.json()
    },
  },
  order: {
    create: async (data: { items: { bookId: string; price: number }[] }) => {
      const res = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      return res.json()
    },
  },
}