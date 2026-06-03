import Link from "next/link"
import { BookOpen, TrendingUp, Star, Download, ArrowRight, ShieldCheck, Zap, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-primary/15 via-primary/5 to-background overflow-hidden">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-6 leading-tight">
                发现好书<br />
                <span className="text-primary">阅读美好</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                云上书城，汇聚海量电子书，涵盖编程、设计、商业、小说等多种品类。支持在线阅读与下载，随时随地开启你的阅读之旅。
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link href="/book">
                  <Button size="lg" className="gap-2 text-base px-8">
                    浏览书籍
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/user/login">
                  <Button size="lg" variant="outline" className="text-base px-8">
                    登录账户
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-10 pt-10 border-t border-border/50">
                <div>
                  <p className="text-2xl font-bold text-primary">100K+</p>
                  <p className="text-sm text-muted-foreground">电子书籍</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">50+</p>
                  <p className="text-sm text-muted-foreground">书籍分类</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">10W+</p>
                  <p className="text-sm text-muted-foreground">活跃读者</p>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="hidden lg:flex justify-center">
              <div className="grid grid-cols-3 gap-3 w-full max-w-md">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className={`aspect-[3/4] rounded-lg bg-gradient-to-br ${i % 2 === 0 ? 'from-primary/20 to-primary/5' : 'from-secondary/20 to-secondary/5'} border border-border shadow-sm flex items-center justify-center`}>
                    <BookOpen className="h-8 w-8 text-primary/40" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 container">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold mb-3">为什么选择 CloudBook</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">我们致力于提供最优质的电子书阅读体验</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: BookOpen, title: "海量书籍", desc: "汇聚数十万本优质电子书，覆盖科技、人文、生活等各大品类", color: "bg-blue-500/10 text-blue-600" },
            { icon: TrendingUp, title: "智能推荐", desc: "基于阅读偏好和热门榜单，智能推荐适合你的书籍", color: "bg-green-500/10 text-green-600" },
            { icon: Download, title: "随时阅读", desc: "多端同步阅读，网页手机平板无缝切换，离线下载随时看", color: "bg-purple-500/10 text-purple-600" },
            { icon: Zap, title: "极速体验", desc: "优化的阅读引擎，流畅的翻页动画，沉浸式阅读体验", color: "bg-orange-500/10 text-orange-600" },
          ].map((item) => (
            <Card key={item.title} className="group hover:border-primary/50 transition-all hover:shadow-md">
              <CardContent className="pt-6 pb-6">
                <div className={`h-11 w-11 rounded-lg ${item.color} flex items-center justify-center mb-4`}>
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Hot Books Section */}
      <section className="py-16 lg:py-20 bg-muted/40">
        <div className="container">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
              <h2 className="text-2xl font-bold">热门书籍</h2>
            </div>
            <Link href="/book">
              <Button variant="ghost" size="sm" className="gap-1">
                查看更多 <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                <div className="aspect-[3/4] bg-muted flex items-center justify-center relative overflow-hidden">
                  <Skeleton className="h-full w-full rounded-none group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                </div>
                <CardContent className="p-3">
                  <h4 className="font-medium text-sm line-clamp-1 mb-0.5">书籍标题 {i}</h4>
                  <p className="text-xs text-muted-foreground">作者名称</p>
                  <p className="text-xs text-primary font-medium mt-1">¥29.9</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 lg:py-20 container">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold mb-2">探索分类</h2>
          <p className="text-muted-foreground text-sm">找到你感兴趣的领域</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 lg:gap-4">
          {[
            { name: "编程开发", icon: "💻", count: "12,340", color: "from-blue-500/10 to-blue-500/5" },
            { name: "设计创意", icon: "🎨", count: "5,678", color: "from-pink-500/10 to-pink-500/5" },
            { name: "商业管理", icon: "📈", count: "8,901", color: "from-green-500/10 to-green-500/5" },
            { name: "小说文学", icon: "📚", count: "23,456", color: "from-yellow-500/10 to-yellow-500/5" },
            { name: "历史传记", icon: "🏛️", count: "3,210", color: "from-purple-500/10 to-purple-500/5" },
            { name: "科技前沿", icon: "🚀", count: "4,567", color: "from-indigo-500/10 to-indigo-500/5" },
            { name: "生活百科", icon: "🌿", count: "6,789", color: "from-teal-500/10 to-teal-500/5" },
            { name: "外语学习", icon: "🌍", count: "2,345", color: "from-orange-500/10 to-orange-500/5" },
          ].map((cat) => (
            <Link key={cat.name} href={`/book?category=${cat.name}`}>
              <Card className="hover:border-primary transition-all hover:shadow-sm cursor-pointer group bg-gradient-to-br hover:from-primary/5 hover:to-transparent">
                <CardContent className="p-4 flex items-center gap-3">
                  <span className="text-2xl">{cat.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{cat.name}</p>
                    <p className="text-xs text-muted-foreground">{cat.count} 本</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">准备好开始阅读了吗？</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
            立即注册，即可免费试读精选书籍，开启你的知识之旅。
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/user/register">
              <Button size="lg" variant="secondary" className="gap-2 px-8">
                免费注册
              </Button>
            </Link>
            <Link href="/book">
              <Button size="lg" variant="outline" className="gap-2 px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                探索书籍
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}