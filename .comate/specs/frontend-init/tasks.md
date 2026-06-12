# CloudBook 前端项目初始化任务

## 任务概览

本任务用于初始化 CloudBook 前端项目，包括 Next.js 项目创建、依赖安装、目录结构搭建、基础组件开发。

---

## 阶段一：项目基础搭建

- [x] 1.1: 创建 Next.js 项目（TypeScript + Tailwind + App Router）
- [x] 1.2: 配置 package.json 脚本和 ESLint
- [x] 1.3: 配置 TypeScript 路径别名（@/*）
- [x] 1.4: 配置 Tailwind CSS（主题色、字体、插件）
- [x] 1.5: 创建 .env.local 环境变量文件
- [x] 1.6: 创建 .gitignore 忽略文件

## 阶段二：目录结构搭建

- [x] 2.1: 创建 src/app 目录及 App Router 结构
- [x] 2.2: 创建 src/components 目录及子目录（ui/book/cart/reader）
- [x] 2.3: 创建 src/lib 目录（api.ts, utils.ts, constants.ts）
- [x] 2.4: 创建 src/hooks 目录
- [x] 2.5: 创建 src/store 目录（Context）
- [x] 2.6: 创建 src/types 目录（TypeScript 类型定义）
- [x] 2.7: 创建 src/app 根布局（layout.tsx）

## 阶段三：基础组件开发

- [x] 3.1: 开发 Button 组件（基于 Radix UI）
- [x] 3.2: 开发 Input 输入框组件
- [x] 3.3: 开发 Card 卡片组件
- [x] 3.4: 开发 Dialog 对话框组件
- [x] 3.5: 开发 Skeleton 骨架屏组件
- [x] 3.6: 开发 Header 导航栏组件
- [x] 3.7: 开发 Footer 页脚组件

## 阶段四：页面开发

- [x] 4.1: 开发首页（page.tsx）
- [x] 4.2: 开发书籍列表页（/book/page.tsx）
- [x] 4.3: 开发书籍详情页（/book/[id]/page.tsx）
- [x] 4.4: 开发登录页（/user/login/page.tsx）
- [x] 4.5: 开发购物车页（/cart/page.tsx）

## 阶段五：状态管理

- [x] 5.1: 开发 AuthContext（用户认证状态）
- [x] 5.2: 开发 CartContext（购物车状态）
- [x] 5.3: 配置 TanStack Query Provider (待配置)
- [x] 5.4: 开发 API 请求封装（lib/api.ts）

## 阶段六：阅读器功能

- [ ] 6.1: 开发 EpubViewer 组件（基于 epub.js）
- [ ] 6.2: 开发 PdfViewer 组件（基于 pdf.js）
- [x] 6.3: 开发阅读器页面（/reader/[id]/page.tsx）

## 阶段七：SEO 优化

- [ ] 7.1: 添加 JSON-LD 结构化数据
- [x] 7.2: 配置全局 Meta 标签
- [x] 7.3: 添加 Open Graph 标签

## 阶段八：项目配置与文档

- [x] 8.1: 更新 README.md 包含前端说明
- [ ] 8.2: 提交代码到 GitHub