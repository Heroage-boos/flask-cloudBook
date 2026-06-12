# 开发文档整合与补充 — 任务计划

- [x] Task 1: 重写 `登录和注册.md`（从大纲到完整文档）
    - 1.1: 编写「密码加密与属性描述符」章节 — werkzeug hash + property setter 模式对比两个项目的实现
    - 1.2: 编写「Jinja2 模式下的认证」章节 — LoginManager + UserMixin + login_user/logout_user + login_required + cookie 操作 + redirect 与重定向攻击防范
    - 1.3: 编写「前后端分离模式下的认证」章节 — auth_required 自定义装饰器（返回 JSON 401）、前端 credentials: 'include'、前端 401 拦截跳转、session 检查
    - 1.4: 编写「WTForms 表单校验」章节 — 自定义校验器（validate_email、validate_old_password）、JSON body 与 formdata 两种参数来源
    - 1.5: 编写「注册完整流程」章节 — user.set_attrs() 批量赋值 → db.session.add/commit → 返回 JSON / 渲染模板
    - 1.6: 编写「登录完整流程」章节 — 查询用户 → 校验密码 → login_user 写入 cookie → 响应
    - 1.7: 编写「密码重置流程」章节 — 需登录 + 校验原密码 + 通过 setter 更新密码

- [x] Task 2: 重写 `crud.md`（从空白到完整文档）
    - 2.1: 编写「Create」章节 — 实例化 → set_attrs → db.session.add/commit（fisher auto_commit 模式 + cloudBook 直接 commit 模式）
    - 2.2: 编写「Read」章节 — query.get 主键查询、filter_by 条件查询、链式查询（filter_by.order_by.first）、列表推导式转换结果、前端 API 调用
    - 2.3: 编写「Update」章节 — set_attrs 批量更新、property setter 更新特定字段、db.session.commit
    - 2.4: 编写「Delete」章节 — 软删除模式（status=0）、自定义 Query 自动过滤 status=1、Gift.delete() 示例
    - 2.5: 编写「最佳实践总结」章节 — auto_commit 上下文管理器的设计、密码自动加密、批量操作与事务

- [x] Task 3: 新建 `前后端分离对比.md`
    - 3.1: 编写对比总览表 — 路由返回、参数获取、登录校验、页面跳转、静态资源、Cookie 六个维度
    - 3.2: 编写「路由与响应」章节 — render_template vs json.dumps(default=...)、重定向的差异
    - 3.3: 编写「认证机制」章节 — @login_required(302) vs @auth_required(401)、前端拦截器的两种实现
    - 3.4: 编写「CORS 与前缀」章节 — 前后端分离的 URL 前缀统一（/api/）、CORS 配置
    - 3.5: 编写「选择建议」章节 — 两种模式的适用场景与选型依据

- [x] Task 4: 新建 `权限与认证.md`
    - 4.1: 编写「Flask-Login 基础」章节 — LoginManager 初始化、user_loader、UserMixin
    - 4.2: 编写「Jinja2 模式权限控制」章节 — @login_required 装饰器原理、302 重定向流程、next 参数与重定向攻击防范
    - 4.3: 编写「前后端分离权限控制」章节 — auth_required 自定义装饰器源码分析、JSON 401 响应、前端统一拦截
    - 4.4: 编写「访问权限分级」章节 — 公开接口、需登录接口、需购买接口的设计

- [x] Task 5: 新建 `数据库与ORM.md`
    - 5.1: 编写「SQLAlchemy 初始化」章节 — Flask-SQLAlchemy 绑定、db.init_app()、db.create_all()
    - 5.2: 编写「Base 基类设计」章节 — __abstract__、created_at/status 公共字段、set_attrs 动态赋值
    - 5.3: 编写「Model 定义」章节 — 列类型与约束（Column、ForeignKey、relationship）、User/Book/BookList 模型（对比两个项目）
    - 5.4: 编写「自定义 Query」章节 — 继承 BaseQuery 实现 status 自动过滤（fisher 独有模式）
    - 5.5: 编写「auto_commit 上下文管理器」章节 — 继承 SQLAlchemy 类、try/commit/rollback 模式（fisher 独有模式）
    - 5.6: 编写「Code First vs Migration」章节 — db.create_all() 的适用场景与 Alembic 迁移方案

- [x] Task 6: 新建 `ViewModel与数据塑形.md`
    - 6.1: 编写「ViewModel 概念」章节 — 为什么需要 ViewModel（解耦数据获取与数据展示）
    - 6.2: 编写「classmethod → 实例方法演进」章节 — fisher5 BookCollection 的 classmethod 模式、fisher6 改为实例方法保存状态
    - 6.3: 编写「BookViewModel 单本书塑形」章节 — 构造函数接收原始 dict、裁剪字段、格式化输出
    - 6.4: 编写「BookCollection 集合塑形」章节 — fill/collect_book 方法、列表推导式批量转换
    - 6.5: 编写「json.dumps default 序列化」章节 — 解释权反转、__dict__ 转换、对比 jsonify 的局限

- [x] Task 7: 新建 `蓝图与应用工厂.md`
    - 7.1: 编写「蓝图的本质」章节 — Blueprint 是什么、为什么需要它、与 @app.route 的对比
    - 7.2: 编写「单蓝图多模块模式」章节 — 一个 Blueprint + 多个 view 模块（fisher 和 cloudBook 都采用）
    - 7.3: 编写「应用工厂模式」章节 — create_app() 函数、延迟导入避免循环引用、多环境配置
    - 7.4: 编写「配置分层」章节 — secure.py + settings.py 双层配置、from_object 的加载顺序
    - 7.5: 编写「循环导入解决方案」章节 — 延迟导入、extensions 模式、init_app() 绑定

- [x] Task 8: 新建 `外部API与爬虫.md`
    - 8.1: 编写「HTTP 工具类封装」章节 — HTTP.get 静态方法、状态码判断、JSON 解析异常处理
    - 8.2: 编写「BookSpider 爬虫类」章节 — 类变量 URL 模板、isbn_search/keyword_search/id_search 方法、__single__/__collection__ 数据填充
    - 8.3: 编写「YuShuBook（fisher 版）演化」章节 — classmethod 无状态模式 → 实例方法有状态模式
    - 8.4: 编写「API 返回数据格式化」章节 — API 字段裁剪、summary 截取、author 列表 join、None 值处理

- [x] Task 9: 补充 `实战开发经验.md`
    - 9.1: 追加「软删除模式」章节 — status 字段 + 自定义 Query 组合实现
    - 9.2: 追加「auto_commit 上下文管理器」章节 — with db.auto_commit(): 的妙用
    - 9.3: 追加「属性描述符实现密码自动加密」章节 — _password 列 + property setter
    - 9.4: 追加「前后端分离认证差异」章节 — @login_required vs @auth_required
    - 9.5: 追加「前端 fetch 封装」章节 — credentials: 'include'、401 统一拦截
    - 9.6: 追加「WTForms 在 JSON API 中的使用」章节 — data=request.json vs formdata=request.form

- [x] Task 10: 确保原有 `flask实战-鱼书开发文档.md` 不被改动，作为总索引保留
    - 10.1: 验证文档完整性，不做任何修改
