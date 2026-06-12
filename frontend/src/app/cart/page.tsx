"use client"

import { AuthGuard } from "@/components/AuthGuard"
import { BookOpen } from "lucide-react"

export default function CartPage() {
  return (
    <AuthGuard>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">购物车</h1>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <BookOpen className="h-16 w-16 text-muted-foreground/30 mb-4" />
          <p className="text-lg font-medium text-muted-foreground mb-2">购物车是空的</p>
          <p className="text-sm text-muted-foreground/70">去挑选一些好书吧</p>
        </div>
      </div>
    </AuthGuard>
  )
}
