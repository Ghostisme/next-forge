# 🎯 快速构建演示 - 一条命令创建 SaaS 应用

## 🚀 核心功能

就像使用 `create-next-app` 一样，现在您可以通过**一条命令**快速创建标准化的 SaaS 管理后台！

---

## ⚡ 快速演示（3分钟）

### 第 1 步：执行创建命令

```bash
pnpm create-saas-app my-admin
```

### 第 2 步：进入目录并启动

```bash
cd apps/my-admin
pnpm dev
```

### 第 3 步：打开浏览器测试

访问 `http://localhost:5173`，使用测试账号登录：
- 管理员: `admin@example.com` / `admin123`

**🎉 完成！您已经拥有一个完整的 SaaS 管理后台！**

---

## 📋 完整命令列表

### 创建应用

```bash
# 基础用法
pnpm create-saas-app <应用名称>

# 示例
pnpm create-saas-app my-admin
pnpm create-saas-app crm-system
pnpm create-saas-app customer-portal
```

### 开发命令

```bash
cd apps/my-admin

pnpm dev          # 启动开发服务器
pnpm build        # 构建生产版本
pnpm preview      # 预览生产构建
pnpm lint         # 代码检查
pnpm typecheck    # 类型检查
```

---

## 🎨 创建过程详解

执行 `pnpm create-saas-app my-admin` 时会发生什么：

### 步骤 1: 复制模板文件 ✅
```
templates/saas-admin/  →  apps/my-admin/
```
完整复制所有文件，包括：
- 源代码（src/）
- 配置文件（vite.config.ts, tsconfig.json 等）
- 文档（README.md, USAGE.md 等）

### 步骤 2: 配置项目信息 ✅
自动更新 `package.json`：
```json
{
  "name": "@apps/my-admin",  // 自动替换
  "version": "1.0.0"
}
```

### 步骤 3: 创建环境配置 ✅
自动生成 `.env.development`：
```env
VITE_USE_MOCK_AUTH=true
VITE_API_BASE_URL=http://localhost:3001
VITE_APP_TITLE=my-admin 管理后台
```

### 步骤 4: 安装依赖 ✅
自动执行 `pnpm install`，安装所有依赖

### 步骤 5: 完成 ✅
显示成功信息和下一步指引

---

## 🎁 您将获得什么

### 完整的项目结构
```
apps/my-admin/
├── src/
│   ├── features/          # 功能模块
│   │   ├── auth/         # ✅ 认证模块
│   │   ├── dashboard/    # ✅ 仪表板
│   │   ├── users/        # ✅ 用户管理
│   │   └── settings/     # ✅ 设置
│   ├── core/             # 核心功能
│   ├── shared/           # 共享资源
│   └── App.tsx
├── .env.development      # ✅ 环境配置
├── package.json          # ✅ 项目配置
├── vite.config.ts        # ✅ Vite 配置
└── 📚 完整文档/
```

### 开箱即用的功能
- ✅ **用户认证** - 登录/登出
- ✅ **权限控制** - RBAC 角色权限
- ✅ **模拟认证** - 无需后端开发
- ✅ **路由系统** - React Router
- ✅ **状态管理** - Zustand + Immer
- ✅ **主题切换** - 亮色/暗色
- ✅ **响应式** - 移动端适配
- ✅ **国际化** - i18n 支持

### 集成的基建包
- ✅ `@repo/design-system` - UI 组件库
- ✅ `@repo/rbac` - 权限控制
- ✅ `@repo/state-management` - 状态管理
- ✅ `@repo/request` - HTTP 请求
- ✅ `@repo/charts` - 图表组件
- ✅ `@repo/internationalization` - 国际化

---

## 💡 使用场景

### 场景 1: 快速启动新项目

```bash
# 创建项目
pnpm create-saas-app customer-portal

# 启动开发
cd apps/customer-portal
pnpm dev

# 🎉 5分钟完成初始化！
```

### 场景 2: 创建多个管理后台

```bash
# 为不同业务创建独立后台
pnpm create-saas-app admin-panel       # 管理员后台
pnpm create-saas-app merchant-portal   # 商户后台
pnpm create-saas-app customer-center   # 客户中心

# 所有应用共享基建包，统一规范
```

### 场景 3: 团队协作

```bash
# 开发者 A 创建应用
pnpm create-saas-app project-alpha
git add apps/project-alpha
git commit -m "feat: init project-alpha"
git push

# 开发者 B 拉取代码
git pull
cd apps/project-alpha
pnpm install
pnpm dev
```

---

## 🎯 与其他方案对比

| 特性 | create-next-app | create-react-app | create-saas-app |
|------|----------------|------------------|-----------------|
| 创建命令 | ✅ | ✅ | ✅ |
| 框架 | Next.js | React | Vite + React |
| 启动时间 | ~3s | ~5s | ~160ms |
| HMR 速度 | ~500ms | ~1s | ~100ms |
| 内置认证 | ❌ | ❌ | ✅ |
| 权限控制 | ❌ | ❌ | ✅ |
| 状态管理 | ❌ | ❌ | ✅ |
| Monorepo | 需配置 | 不支持 | ✅ 原生 |
| 模拟后端 | ❌ | ❌ | ✅ |

---

## 📚 详细文档

创建后的应用包含完整文档：

| 文档 | 说明 |
|------|------|
| `README.md` | 项目概述 |
| `QUICK_START.md` | 快速开始 |
| `LOGIN_TEST_GUIDE.md` | 登录测试 |
| `USAGE.md` | 详细使用 |
| `ARCHITECTURE.md` | 架构设计 |
| `IMPORT_GUIDE.md` | 导入指南 |

---

## 🔧 高级功能

### 自定义模板

修改 `templates/saas-admin/` 目录，所有新创建的应用都会使用新模板。

### 批量创建

```bash
for app in admin merchant customer; do
  pnpm create-saas-app "${app}-portal"
done
```

### 环境切换

```bash
# 开发环境（模拟认证）
VITE_USE_MOCK_AUTH=true pnpm dev

# 生产环境（真实 API）
VITE_USE_MOCK_AUTH=false pnpm build
```

---

## 🐛 常见问题

### Q: 应用已存在怎么办？

```bash
# 删除现有应用
rm -rf apps/my-admin

# 或使用不同名称
pnpm create-saas-app my-admin-v2
```

### Q: 如何修改默认配置？

编辑创建后的 `.env.development` 文件：
```env
VITE_API_BASE_URL=http://your-backend:port
VITE_APP_TITLE=自定义标题
```

### Q: 如何添加新功能？

```bash
cd apps/my-admin/src/features
mkdir products
# 创建产品管理模块
```

---

## 🎉 立即开始

### 第 1 步：创建应用

```bash
pnpm create-saas-app my-first-admin
```

### 第 2 步：启动开发

```bash
cd apps/my-first-admin
pnpm dev
```

### 第 3 步：开始开发

浏览器打开 `http://localhost:5173`，使用 `admin@example.com` / `admin123` 登录！

---

## 📖 更多信息

- 📚 **完整指南**: [CREATE_SAAS_APP_GUIDE.md](./CREATE_SAAS_APP_GUIDE.md)
- 🛠️ **脚手架文档**: [scripts/README.md](./scripts/README.md)
- 🎯 **模板文档**: [templates/saas-admin/README.md](./templates/saas-admin/README.md)

---

**✨ 3 分钟创建，5 分钟启动，立即开发！** 🚀

