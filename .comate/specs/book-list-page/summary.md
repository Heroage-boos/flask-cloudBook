# 书籍列表页面 - 完成总结

## 完成内容

### 修改文件清单

| 文件 | 操作 | 说明 |
|---|---|---|
| `frontend/src/app/book/page.tsx` | **重写** | 从占位符改为完整功能的书籍列表页 |
| `frontend/src/components/Header.tsx` | **修改** | 搜索后跳转到 `/book?q=关键词` |

### 功能实现

#### 1. BookListPage 主组件 (`book/page.tsx`)
- 使用 `"use client"` + `useSearchParams()` 读取 URL 搜索参数
- 状态管理：`books`, `loading`, `query`, `total`
- `fetchBooks()` 调用 `api.books.list` 获取数据
- 首次加载时自动读取 URL 中的 `?q=参数` 并请求
- 页面内搜索表单支持提交搜索并更新 URL

#### 2. BookCard 子组件
- 书籍封面图（有图显示图片，无图 fallback 显示 BookOpen 图标）
- 标题（单行截断）、作者、价格
- 包裹 `<Link>` 跳转 `/book/[id]`
- hover 时封面放大 + 卡片阴影效果

#### 3. 骨架屏 + 空状态
- `BookGridSkeleton`：12 个骨架卡片占位，与真实网格布局一致
- `EmptyState`：搜索无结果时显示提示 + 清除按钮
- 默认空状态：无搜索词时引导用户输入

#### 4. Header 搜索联动
- 引入 `useRouter` 替代直接 API 调用
- 搜索回车后 `router.push(/book?q=关键词)` 跳转到列表页
- 移除了 Header 中不再需要的 `api` import

### 数据流

```
Header 搜索回车 → router.push('/book?q=xxx')
                    ↓
BookListPage useSearchParams() 读取 q 参数
                    ↓
            fetchBooks(q) → api.books.list({ q })
                    ↓
            loading=true → 显示 Skeleton
            成功     → 渲染 BookCard 网格
            失败/空 → 显示 EmptyState
```

### 边界处理
- 无搜索词首次进入：显示默认引导提示
- 搜索无结果：空状态 + 清除按钮重置
- 图片缺失：fallback 图标占位
- API 异常：catch 中 console.error，不崩溃
