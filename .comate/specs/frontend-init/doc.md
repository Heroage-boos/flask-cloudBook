# CloudBook 前端项目初始化规范

## 1. 项目概述

| 项目名称 | 技术栈 | 说明 |
|---------|--------|------|
| CloudBook 前端 | Next.js + TypeScript + Tailwind CSS | 电子书电商平台前端界面 |

### 核心依赖

| 依赖 | 用途 | 版本建议 |
|------|------|----------|
| `next` | React 框架 | 14.x |
| `react` / `react-dom` | UI 库 | 18.x |
| `typescript` | 类型系统 | 5.x |
| `tailwindcss` | 样式方案 | 3.x |
| `@radix-ui/*` | 无样式组件 | 最新 |
| `@tanstack/react-query` | 数据请求与缓存 | 5.x |
| `epubjs` | EPUB 阅读器 | 0.3.x |
| `pdfjs-dist` | PDF 阅读器 | 4.x |

---

## 2. 项目结构设计

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # 根布局
│   │   ├── page.tsx            # 首页
│   │   ├── book/
│   │   │   ├── page.tsx        # 书籍列表/搜索
│   │   │   └── [id]/page.tsx   # 书籍详情
│   │   ├── cart/page.tsx       # 购物车
│   │   ├── reader/[id]/page.tsx # 阅读器
│   │   └── user/
│   │       ├── login/page.tsx  # 登录
│   │       └── profile/page.tsx # 个人中心
│   ├── components/
│   │   ├── ui/                 # Radix UI 基础组件
│   │   ├── book/               # 书籍相关组件
│   │   ├── cart/               # 购物车组件
│   │   └── reader/             # 阅读器组件
│   ├── lib/
│   │   ├── api.ts              # API 请求封装
│   │   ├── utils.ts            # 工具函数
│   │   └── constants.ts        # 常量定义
│   ├── hooks/                  # 自定义 Hooks
│   │   ├── useCart.ts          # 购物车状态
│   │   └── useAuth.ts          # 认证状态
│   ├── store/                  # React Context 状态
│   │   ├── CartContext.tsx
│   │   └── AuthContext.tsx
│   └── types/                  # TypeScript 类型定义
│       ├── book.ts
│       ├── user.ts
│       └── order.ts
├── public/                     # 静态资源
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## 3. 页面路由规划

| 路由 | 页面 | 权限 |
|------|------|------|
| `/` | 首页 | 公开 |
| `/book` | 书籍列表/搜索 | 公开 |
| `/book/[id]` | 书籍详情 | 公开 |
| `/cart` | 购物车 | 需登录 |
| `/reader/[id]` | 在线阅读 | 需购买 |
| `/user/login` | 登录页 | 公开 |
| `/user/profile` | 个人中心 | 需登录 |

---

## 4. 组件设计

### 4.1 UI 基础组件 (基于 Radix UI)

```
components/ui/
├── button.tsx         # 按钮组件
├── input.tsx          # 输入框
├── card.tsx           # 卡片
├── dialog.tsx         # 对话框
├── dropdown-menu.tsx  # 下拉菜单
├── tabs.tsx           # 标签页
└── skeleton.tsx       # 加载骨架屏
```

### 4.2 业务组件

```
components/
├── book/
│   ├── BookCard.tsx        # 书籍卡片
│   ├── BookList.tsx        # 书籍列表
│   ├── BookSearch.tsx      # 搜索框
│   └── BookDetail.tsx      # 详情组件
├── cart/
│   ├── CartItem.tsx        # 购物车项
│   └── CartSummary.tsx     # 购物车汇总
└── reader/
    ├── EpubViewer.tsx      # EPUB 阅读器
    └── PdfViewer.tsx       # PDF 阅读器
```

---

## 5. 状态管理方案

### 5.1 React Context (轻量级)

| Context | 用途 | 持久化 |
|---------|------|--------|
| `AuthContext` | 用户登录状态、用户信息 | localStorage |
| `CartContext` | 购物车商品列表 | localStorage |

### 5.2 TanStack Query (服务端状态)

```typescript
// 书籍列表查询示例
useQuery({
  queryKey: ['books', searchParams],
  queryFn: () => fetchBooks(searchParams),
  staleTime: 5 * 60 * 1000, // 5分钟
})
```

---

## 6. API 层设计

### 6.1 API 请求封装

```typescript
// lib/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export const api = {
  books: {
    list: (params: BookSearchParams) => 
      fetch(`${API_BASE}/api/books?${new URLSearchParams(params)}`),
    detail: (id: string) => 
      fetch(`${API_BASE}/api/books/${id}`),
  },
  user: {
    login: (data: LoginData) => 
      fetch(`${API_BASE}/api/user/login`, { method: 'POST', body: JSON.stringify(data) }),
  },
  cart: {
    get: () => fetch(`${API_BASE}/api/cart`),
    add: (bookId: string) => fetch(`${API_BASE}/api/cart`, { method: 'POST', body: JSON.stringify({ bookId }) }),
  },
}
```

---

## 7. SEO 优化

### 7.1 JSON-LD 结构化数据

```typescript
// app/book/[id]/page.tsx
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Book",
  "name": book.title,
  "author": book.author,
  "isbn": book.isbn,
  "publisher": book.publisher,
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": book.rating,
    "reviewCount": book.reviewCount
  }
}
```

### 7.2 Meta 标签

```typescript
// 使用 next/head
<title>{book.title} - CloudBook</title>
<meta name="description" content={book.summary} />
<meta property="og:title" content={book.title} />
<meta property="og:description" content={book.summary} />
<meta property="og:image" content={book.cover} />
```

---

## 8. Tailwind CSS 配置

```typescript
// tailwind.config.ts
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',    // 主题色
        secondary: '#10B981',  // 辅助色
        accent: '#F59E0B',     // 强调色
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
```

---

## 9. 环境变量

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_NAME=CloudBook
```

---

## 10. 初始化步骤

### 10.1 创建 Next.js 项目

```bash
cd frontend
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

### 10.2 安装核心依赖

```bash
# Radix UI 组件
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-tabs @radix-ui/react-slot

# 数据请求
npm install @tanstack/react-query

# 阅读器
npm install epubjs pdfjs-dist

# 工具
npm install class-variance-authority clsx tailwind-merge lucide-react
npm install -D @tailwindcss/typography
```

---

## 11. 验收标准

- [ ] Next.js 项目初始化成功
- [ ] TypeScript 配置正确，无类型错误
- [ ] Tailwind CSS 正常渲染
- [ ] Radix UI 组件可用
- [ ] 基础布局组件完成（Header、Footer）
- [ ] 主页展示结构完成