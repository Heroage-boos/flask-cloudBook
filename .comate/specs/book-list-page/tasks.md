# 书籍列表页面 - 任务计划

- [ ] Task 1: 重写 BookListPage 主组件 (`book/page.tsx`)
    - 1.1: 添加 `"use client"` 指令和必要 imports（useState, useEffect, useCallback, useSearchParams, api, UI 组件）
    - 1.2: 实现状态管理（books, loading, query, total）
    - 1.3: 实现 `fetchBooks` 数据获取函数，调用 `api.books.list`
    - 1.4: 实现 `useEffect` 初始加载逻辑，读取 URL 搜索参数
    - 1.5: 实现搜索表单提交处理
    - 1.6: 实现页面布局：标题栏 + 搜索框区域

- [ ] Task 2: 实现 BookCard 子组件
    - 2.1: 创建 BookCard 函数组件，接收 book prop
    - 2.2: 实现书籍封面图展示（有图显示图片，无图 fallback 显示图标）
    - 2.3: 实现书籍信息区（标题、作者、价格）
    - 2.4: 包裹 Link 跳转到 `/book/[id]`
    - 2.5: 添加 hover 动效

- [ ] Task 3: 实现骨架屏和空状态组件
    - 3.1: 创建 `BookGridSkeleton` 组件，12 个骨架卡片占位
    - 3.2: 创建 `EmptyState` 空状态组件（无搜索结果提示）
    - 3.3: 在主组件中条件渲染：loading → skeleton / 有数据 → grid / 无数据 → empty

- [ ] Task 4: Header 搜索联动跳转
    - 4.1: 修改 `Header.tsx` 的 `handleSearch`，搜索后跳转到 `/book?q=关键词`
    - 4.2: 引入 `useRouter` 替代 console.log
