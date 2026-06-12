# 开发文档整合与补充 (dev-documentation)

## 需求场景

用户拥有两个 Flask 项目需要总结学习经验：

1. **fisher_end** — Flask + Jinja2 模板渲染的单体应用（鱼书图书分享平台）
2. **flask-cloudBook** — Flask + Next.js 前后端分离的电子书商城

现有文档状态：
- `flask实战-鱼书开发文档.md`（1286行）— 完整的 fisher 项目演进文档，但仅覆盖 Jinja2 模式
- `实战开发经验.md`（296行）— Python/Flask 技巧集，零散但实用
- `登录和注册.md`（29行）— 仅有大纲，无实质内容
- `crud.md`（1行）— 完全空白

需要基于两个项目创建完整、结构化的开发文档，供后续学习参考。

## 处理逻辑

### 一、拆分 `flask实战-鱼书开发文档.md`

当前文档内容庞杂，需要按业务模块和技术主题拆分为多个独立文档，方便按需查阅：

| 新文档 | 拆分来源 | 内容重点 |
|--------|---------|---------|
| `项目架构演进.md` | 当前文档第一至第五步 | 从单文件→蓝图→App Factory→SQLAlchemy→ViewModel 的完整演进路线 |
| `蓝图与应用工厂.md` | 当前文档蓝图部分 | Blueprint 注册、单蓝图多模块、应用工厂模式、配置分层 |
| `数据库与ORM.md` | 当前文档 SQLAlchemy 部分 + cloudBook models | Base 基类设计、模型定义、关系映射、自定义 Query、Code First、auto_commit 上下文 |
| `ViewModel与数据塑形.md` | 当前文档 ViewModel 部分 + cloudBook view_models | classmethod→实例方法演进、json.dumps default 序列化、数据裁剪模式 |
| `表单校验.md` | 当前文档 WTForms 部分 + cloudBook forms | 自定义校验器、表单定义、前后端分离下的表单使用 |
| `权限与认证.md` | 合并 `登录和注册.md` + fisher auth 模块 + cloudBook auth | 详见下文"登录和注册.md 补充" |
| `CRUD实战.md` | 新建（填充 `crud.md`） | 详见下文"crud.md 补充" |
| `外部API与爬虫.md` | 当前文档 YuShuBook 部分 + cloudBook spider | HTTP 工具类、API 调用封装、数据填充模式 |
| `部署与配置.md` | 当前文档配置部分 + cloudBook config | 配置拆分、环境变量、gunicorn+nginx、CORS |

### 二、补充 `登录和注册.md`

整合两个项目的认证实现，构建完整的认证模块文档：

**fisher_end (Jinja2 模式) 提供的知识点：**
1. **密码加密**：`werkzeug.security.generate_password_hash` / `check_password_hash`
2. **属性描述符实现密码 setter**：`User._password` 列 + `@password.setter` 自动哈希
3. **UserMixin + LoginManager**：`flask_login` 会话管理
4. **用户加载器**：`@login_manager.user_loader` 从 session 加载用户
5. **login_user / logout_user**：写入/清空 cookie
6. **login_required 装饰器**：Jinja2 模式下的页面保护
7. **动态赋值**：`set_attrs()` 方法批量设置模型属性
8. **ORM 方式保存模型**：`db.session.add()` + `db.session.commit()`
9. **自定义校验器**：`validate_email`、`validate_old_password` 字段级校验
10. **redirect 重定向**：Jinja2 模式下的登录后跳转
11. **cookie 操作**：`set_cookie` 设置持久化 cookie
12. **重定向攻击防范**：`url_for` 而非直接使用用户提供的 URL

**flask-cloudBook (前后端分离) 提供的知识点：**
1. **前后端分离下的登录校验**：`auth_required` 自定义装饰器（返回 JSON 401 而非 302 重定向）
2. **前端请求封装**：`credentials: 'include'` 携带 cookie
3. **前端 401 拦截**：统一跳转登录页
4. **session 检查**：前端`checkSession()`检测登录状态
5. **WTForms 与 JSON body**：`RegisterForm(data=request.json)`

### 三、填充 `crud.md`

目前空白，结合两个项目的模型操作，构建完整的 CRUD 最佳实践文档：

**Create（创建）：**
- `user = User()` → `user.set_attrs(form.data)` → `db.session.add(user)` → `db.session.commit()`
- `db.auto_commit` 上下文管理器（fisher_end 独有的 try/commit/rollback 模式）
- 密码通过 property setter 自动加密

**Read（读取）：**
- `User.query.get(uid)` — 主键查询
- `User.query.filter_by(email=xxx).first()` — 条件查询
- `Book.recent()` — 链式操作：`filter_by().order_by().first()`
- 列表推导式转换查询结果
- CloudBook 前端 API 调用模式：`api.books.list()` / `api.books.detail()`

**Update（更新）：**
- `set_attrs()` 批量更新
- `user.password = new_password` 通过 setter 更新
- `db.session.commit()` 提交

**Delete（删除）：**
- 软删除：`status = 0`（两个项目都采用此模式）
- 自定义 Query 类自动过滤 `status=1`
- Fisher 的 `Gift.delete()` 和 `Wish.delete()` 方法

### 四、新增前后端分离对比文档

这是两个项目最核心的差异，值得单独成文：

| 维度 | fisher_end (Jinja2) | flask-cloudBook (分离) |
|------|-------------------|----------------------|
| 路由返回 | `render_template('index.html')` | `json.dumps(obj, default=lambda o: o.__dict__)` |
| 参数获取 | `request.form` | `request.json` / `request.args` |
| 登录校验 | `@login_required` → 302 重定向 | `@auth_required` → JSON 401 |
| 页面跳转 | `redirect(url_for('web.login'))` | 前端 `window.location.href = '/user/login'` |
| 静态资源 | `url_for('static', ...)` | 前端独立管理 |
| Cookie | 后端设置/读取 | `credentials: 'include'` + 后端设置 |

### 五、补充 `实战开发经验.md`

将现有经验和新增发现统一到一个文档中：

**已有技巧（保留）：**
- join 在项目中的使用
- 多线程使用场景
- @classmethod vs @staticmethod
- 列表推导式
- None 处理（`or ""`、`dict.get()`）
- json 序列化与解释权反转
- 静态资源访问
- 命名规范

**新增技巧（从两个项目补充）：**
- 软删除模式（status 字段 + 自定义 Query）
- auto_commit 上下文管理器
- 属性描述符实现密码自动加密
- 前后端分离 vs Jinja2 的认证差异
- 前端 fetch 封装与 401 拦截
- WTForms 在 JSON API 中的使用（`data=request.json`  vs `formdata=request.form`）
- Application Factory 模式与循环导入解决
- 代码规范：`Pipfile` 依赖管理、配置文件分层
- 单蓝图多模块 vs 多蓝图架构选择

## 文件影响

| 文件 | 操作 | 路径 |
|------|------|------|
| flask实战-鱼书开发文档.md | 保持不变，作为总目录索引 | `d:\python-app\flask实战-鱼书开发\` |
| 登录和注册.md | 重写（从大纲填充完整内容） | `d:\python-app\flask实战-鱼书开发\` |
| crud.md | 重写（从空白填充完整内容） | `d:\python-app\flask实战-鱼书开发\` |
| 实战开发经验.md | 补充新增技巧 | `d:\python-app\flask实战-鱼书开发\` |
| 前后端分离对比.md | 新建 | `d:\python-app\flask实战-鱼书开发\` |
| 权限与认证.md | 新建（提取认证相关内容） | `d:\python-app\flask实战-鱼书开发\` |
| 数据库与ORM.md | 新建（提取 ORM 相关内容） | `d:\python-app\flask实战-鱼书开发\` |
| ViewModel与数据塑形.md | 新建（提取 ViewModel 内容） | `d:\python-app\flask实战-鱼书开发\` |
| 蓝图与应用工厂.md | 新建（提取架构内容） | `d:\python-app\flask实战-鱼书开发\` |
| 外部API与爬虫.md | 新建（提取爬虫/API 内容） | `d:\python-app\flask实战-鱼书开发\` |

## 实现策略

1. **不删除原有文件**：`flask实战-鱼书开发文档.md` 保留作为总索引，不删除
2. **先重写空白/大纲文件**：`登录和注册.md` 和 `crud.md` 最急需填充
3. **再新建专题文档**：按模块拆分专业文档
4. **最后补充经验文档**：在 `实战开发经验.md` 末尾追加新发现

## 预期效果

- `登录和注册.md` 从 29 行大纲 → 完整的认证模块文档（覆盖两种架构模式）
- `crud.md` 从 1 行空白 → 完整的 CRUD 最佳实践文档
- `实战开发经验.md` 从 296 行 → 400+ 行，补充前后端分离相关技巧
- 新增 6 个专题文档，覆盖架构、ORM、ViewModel、认证、爬虫、前后端对比
- `flask实战-鱼书开发文档.md` 保持不变，作为总入口
