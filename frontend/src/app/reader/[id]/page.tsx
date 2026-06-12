"use client"

import { AuthGuard } from "@/components/AuthGuard"

export default function ReaderPage() {
  return (
    <AuthGuard>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">在线阅读</h1>
        <p className="text-muted-foreground">阅读器页面开发中...</p>
      </div>
    </AuthGuard>
  )
}
