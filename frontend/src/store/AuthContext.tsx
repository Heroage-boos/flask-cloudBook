"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { User, LoginData, RegisterData } from "@/types/user"
import { api, type ApiResponse } from "@/lib/api"

interface AuthContextType {
  user: User | null
  isLoading: boolean  // true = 正在校验登录态，尚未完成
  isAuthenticated: boolean
  login: (data: LoginData) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // 启动时：先从 localStorage 恢复，再向后端校验 session 是否仍有效
  useEffect(() => {
    async function validateSession() {
      const savedUser = localStorage.getItem("cloudbook-user")
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser)
          setUser(parsed)
        } catch {
          // ignore corrupt data
        }
      }

      // 向后端发请求校验 cookie/session 是否有效
      const isValid = await api.user.checkSession()
      if (!isValid) {
        // 后端 session 已过期，清除本地状态
        setUser(null)
        localStorage.removeItem("cloudbook-user")
      }
      setIsLoading(false)
    }

    validateSession()
  }, [])

  useEffect(() => {
    if (user) {
      localStorage.setItem("cloudbook-user", JSON.stringify(user))
    } else {
      localStorage.removeItem("cloudbook-user")
    }
  }, [user])

  const login = async (data: LoginData) => {
    setIsLoading(true)
    try {
      const response = await api.user.login(data)
      if (response.code === 0) {
        setUser(response.data as unknown as User)
      } else {
        throw new Error(response.message || "登录失败")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (data: RegisterData) => {
    setIsLoading(true)
    try {
      const response = await api.user.register(data)
      if (response.code === 0) {
        setUser(response.data as unknown as User)
      } else {
        throw new Error(response.message || "注册失败")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("cloudbook-user")
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user && !isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
