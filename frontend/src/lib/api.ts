import { API_BASE_URL } from './constants'

export interface Book {
  id: number
  title: string
  author: string
  binding?: string
  publisher?: string
  price: string
  image?: {
    thumbnail: string
    large?: string
  }
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

export interface BookListResponse {
  books: Book[]
  total: number
}

/** 后端统一响应格式 */
export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
}

/** 统一请求封装：携带 cookie 凭证，统一处理 401 */
async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, { ...options, credentials: 'include' })

  // 未登录 → 前端跳转登录页
  if (res.status === 401) {
    window.location.href = '/user/login'
    throw new Error('未登录')
  }

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`)
  }
  return res.json()
}

/** 校验 session 是否有效（不触发 401 跳转，仅返回状态） */
async function checkSession(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/user/home`, { credentials: 'include' })
    return res.ok && res.status !== 401
  } catch {
    return false
  }
}

export const api = {
  books: {
    list: async (params: BookSearchParams = {}): Promise<BookListResponse> => {
      const query = new URLSearchParams(params as Record<string, string>)
      return request(`${API_BASE_URL}/api/book/search?${query}`)
    },
    detail: async (isbn: string): Promise<Book> => {
      return request(`${API_BASE_URL}/api/book/details/${isbn}`)
    },
  },
  user: {
    /** 校验当前 session 是否有效 */
    checkSession,
    login: async (data: { email: string; password: string }): Promise<ApiResponse<{ email: string; nickname: string }>> => {
      return request(`${API_BASE_URL}/api/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
    },
    register: async (data: { email: string; password: string; nickname?: string }): Promise<ApiResponse<{ email: string; nickname: string }>> => {
      return request(`${API_BASE_URL}/api/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
    },
  },
  cart: {
    get: async () => {
      return request(`${API_BASE_URL}/api/cart`)
    },
    add: async (bookId: string) => {
      return request(`${API_BASE_URL}/api/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId }),
      })
    },
    remove: async (bookId: string) => {
      return request(`${API_BASE_URL}/api/cart/${bookId}`, {
        method: 'DELETE',
      })
    },
  },
  order: {
    create: async (data: { items: { bookId: string; price: number }[] }) => {
      return request(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
    },
  },
}
