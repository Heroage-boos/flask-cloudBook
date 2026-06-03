"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { User, LoginData, RegisterData } from "@/types/user"
import { api } from "@/lib/api"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (data: LoginData) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem("cloudbook-user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch {
        // ignore
      }
    }
    setIsLoading(false)
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
      if (response.success) {
        setUser(response.user)
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
      if (response.success) {
        setUser(response.user)
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
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
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