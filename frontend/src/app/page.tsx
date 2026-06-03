import Link from "next/link"
import { BookOpen, TrendingUp, Star, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-b from-primary/10 to-background">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
              发现好书<br />阅读美好
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              云上书城，汇聚海量电子书，涵盖编程、设计、商业、小说等多种品类，随时随地开启阅读之旅。
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/book">
                <Button size="lg" className="gap-2">
                  <BookOpen className="h-5 w-5" />
                  浏览书籍
                </Button>
              </Link>
              <Link href="/user/login">
                <Button size="lg" variant="outline">
                  登录账户
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 container">
        <h2 className="text-2xl font-bold text-center mb-12">为什么选择 CloudBook</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">海量书籍</h3>
              <p className="text-sm text-muted-foreground">
                汇聚数十万本优质电子书，覆盖科技、人文、生活等各大品类，满足你的阅读需求。
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">智能推荐</h3>
              <p className="text-sm text-muted-foreground">
                基于阅读偏好和热门榜单，智能推荐适合你的书籍，发现意想不到的好书。
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Download className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">随时阅读</h3>
              <p className="text-sm text-muted-foreground">
                支持多端同步阅读，网页、手机、平板无缝切换，离线下载，随时随地阅读。
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Hot Books Section */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <h2 className="text-2xl font-bold">热门书籍</h2>
            </div>
            <Link href="/book">
              <Button variant="ghost" size="sm">查看更多</Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-[3/4] bg-muted flex items-center justify-center">
                  <Skeleton className="h-full w-full rounded-none" />
                </div>
                <CardContent className="p-3">
                  <h4 className="font-medium text-sm line-clamp-1">书籍标题 {i}</h4>
                  <p className="text-xs text-muted-foreground">作者名称</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 container">
        <h2 className="text-2xl font-bold text-center mb-8">书籍分类</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "编程开发", icon: "💻", color: "bg-blue-100" },
            { name: "设计创意", icon: "🎨", color: "bg-pink-100" },
            { name: "商业管理", icon: "📈", color: "bg-green-100" },
            { name: "小说文学", icon: "📚", color: "bg-yellow-100" },
            { name: "历史传记", icon: "🏛️", color: "bg-purple-100" },
            { name: "科技前沿", icon: "🚀", color: "bg-indigo-100" },
            { name: "生活百科", icon: "🌿", color: "bg-teal-100" },
            { name: "外语学习", icon: "🌍", color: "bg-orange-100" },
          ].map((cat) => (
            <Link key={cat.name} href={`/book?category=${cat.name}`}>
              <Card className="hover:border-primary transition-colors cursor-pointer">
                <CardContent className="p-4 flex items-center gap-4">
                  <span className={`text-2xl w-10 h-10 rounded-lg ${cat.color} flex items-center justify-center`}>
                    {cat.icon}
                  </span>
                  <span className="font-medium">{cat.name}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}