"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/store/AuthContext"
import { Skeleton } from "@/components/ui/skeleton"

/** 不需要登录即可访问的路由白名单 */
const PUBLIC_PATHS = ["/", "/book", "/user/login", "/user/register"]

/** 需要登录才能访问的页面包装组件 */
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // 加载完成且未登录 → 跳转登录页，记录来源路径以便登录后回跳
    if (!isLoading && !user) {
      router.replace(`/user/login?redirect=${encodeURIComponent(pathname)}`)
    }
  }, [isLoading, user, router, pathname])

  // 加载中或未登录时显示骨架屏
  if (isLoading || !user) {
    return (
      <div className="container py-8 space-y-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-[400px] w-full" />
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      </div>
    )
  }

  return <>{children}</>
}
