import Link from "next/link"
import { BookOpen } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <BookOpen className="h-6 w-6" />
              <span className="text-lg font-bold">CloudBook</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              发现好书，阅读美好。云上书城，为你提供优质的电子书阅读体验。
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">书籍分类</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/book?category=programming">编程开发</Link></li>
              <li><Link href="/book?category=design">设计创意</Link></li>
              <li><Link href="/book?category=business">商业管理</Link></li>
              <li><Link href="/book?category=novel">小说文学</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">帮助与支持</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/help">帮助中心</Link></li>
              <li><Link href="/about">关于我们</Link></li>
              <li><Link href="/contact">联系我们</Link></li>
              <li><Link href="/faq">常见问题</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">法律声明</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy">隐私政策</Link></li>
              <li><Link href="/terms">服务条款</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CloudBook. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}