export interface User {
  id: number
  email: string
  nickname?: string
  avatar?: string
  createdAt?: string
}

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  nickname?: string
}