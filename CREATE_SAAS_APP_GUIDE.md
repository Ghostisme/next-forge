# 🚀 快速构建指令 - SaaS 应用脚手架

## 🎯 概述

就像使用 `create-next-app` 一样，您现在可以通过**一条命令**快速创建标准化的 SaaS 管理后台！

```bash
pnpm create-saas-app my-admin
```

✅ 完整模板自动复制  
✅ 依赖自动安装  
✅ 环境自动配置  
✅ 立即可用开发  

---

## 📦 使用方法

### 方式 1: pnpm 脚本（推荐）

```bash
# 在项目根目录执行
pnpm create-saas-app <应用名称>

# 示例
pnpm create-saas-app my-admin
pnpm create-saas-app crm-system
pnpm create-saas-app customer-portal
```

### 方式 2: 直接运行脚本

```bash
# Node.js 脚本
node scripts/create-saas-app.js my-admin

# Bash 脚本（Linux/Mac）
./scripts/create-saas-app.sh my-admin
```

---

## 🎨 命名规则

应用名称必须：
- ✅ 小写字母 `a-z`
- ✅ 数字 `0-9`
- ✅ 连字符 `-`
- ❌ 不能有大写字母
- ❌ 不能有特殊字符

### 正确示例 ✅

```bash
pnpm create-saas-app admin-panel
pnpm create-saas-app user-management
pnpm create-saas-app analytics-v2
pnpm create-saas-app crm2024
```

### 错误示例 ❌

```bash
pnpm create-saas-app MyAdmin        # 包含大写
pnpm create-saas-app my_admin       # 包含下划线
pnpm create-saas-app "my admin"     # 包含空格
```

---

## ⚡ 完整流程演示

### 第 1 步：执行创建命令

```bash
pnpm create-saas-app my-admin
```

您会看到：

```
🚀 开始创建 SaaS 应用...

📦 应用名称: my-admin

[1/5] 复制模板文件...
✅ 模板文件复制完成

[2/5] 配置项目信息...
✅ 项目配置完成

[3/5] 创建环境配置...
✅ 环境配置创建完成

[4/5] 安装依赖（这可能需要几分钟）...
✅ 依赖安装完成

[5/5] 完成！

🎉 应用创建成功！

📁 项目路径:
   /path/to/your/project/apps/my-admin

🚀 快速开始:
   cd apps/my-admin
   pnpm dev

🔑 测试账号:
   管理员: admin@example.com / admin123
   普通用户: user@example.com / user123

✨ 祝您开发愉快！
```

### 第 2 步：启动开发服务器

```bash
cd apps/my-admin
pnpm dev
```

### 第 3 步：开始开发

浏览器自动打开 `http://localhost:5173`，使用测试账号登录即可开始！

---

## 📂 生成的项目结构

```
apps/my-admin/
├── src/
│   ├── features/              # 🎯 功能模块（Feature-First）
│   │   ├── auth/             # 认证模块
│   │   │   ├── pages/        # 页面组件
│   │   │   ├── components/   # 功能组件
│   │   │   └── index.tsx     # 模块入口
│   │   ├── dashboard/        # 仪表板
│   │   ├── users/            # 用户管理
│   │   └── settings/         # 设置
│   │
│   ├── core/                 # 🔧 核心功能
│   │   ├── router/           # 路由配置
│   │   ├── services/         # 服务层（含模拟认证）
│   │   └── providers/        # 全局提供者
│   │
│   ├── shared/               # 🔄 共享资源
│   │   ├── components/       # 共享组件
│   │   ├── hooks/            # 自定义 Hooks
│   │   └── utils/            # 工具函数
│   │
│   └── App.tsx               # 应用入口
│
├── public/                   # 静态资源
├── .env.development          # ✅ 自动生成
├── .env.example              # 环境变量示例
├── package.json              # ✅ 自动配置
├── vite.config.ts            # Vite 配置
├── tsconfig.json             # TypeScript 配置
├── tailwind.config.js        # Tailwind 配置
│
└── 📚 完整文档/
    ├── README.md
    ├── QUICK_START.md
    ├── LOGIN_TEST_GUIDE.md
    ├── USAGE.md
    ├── ARCHITECTURE.md
    └── ...更多文档
```

---

## 🎁 开箱即用的功能

创建后的应用自动包含：

### 核心功能 ✅
- ✅ **用户认证** - 登录/登出/权限控制
- ✅ **模拟认证** - 无需后端即可开发
- ✅ **路由系统** - React Router + 懒加载
- ✅ **状态管理** - Zustand + Immer
- ✅ **权限控制** - RBAC 角色权限
- ✅ **主题切换** - 亮色/暗色主题
- ✅ **国际化** - i18n 支持
- ✅ **响应式** - 移动端适配

### 基建集成 ✅
- ✅ `@repo/design-system` - UI 组件库
- ✅ `@repo/rbac` - 权限控制
- ✅ `@repo/state-management` - 状态管理
- ✅ `@repo/request` - HTTP 请求
- ✅ `@repo/charts` - 图表组件
- ✅ `@repo/internationalization` - 国际化

### 开发体验 ✅
- ✅ **TypeScript** - 完整类型支持
- ✅ **ESLint** - 代码检查
- ✅ **Prettier** - 代码格式化
- ✅ **HMR** - 热更新 <100ms
- ✅ **路径别名** - `@/`, `@features/`, `@core/`

### 生产优化 ✅
- ✅ **代码分割** - 按需加载
- ✅ **Tree Shaking** - 移除无用代码
- ✅ **Gzip 压缩** - 减小体积
- ✅ **Source Map** - 调试支持

---

## 🎯 典型使用场景

### 场景 1: 快速启动新项目

```bash
# 1. 创建应用
pnpm create-saas-app customer-portal

# 2. 进入目录
cd apps/customer-portal

# 3. 启动开发
pnpm dev

# 🎉 5分钟内完成项目初始化！
```

### 场景 2: 创建多个管理后台

```bash
# 为不同业务创建独立后台
pnpm create-saas-app admin-panel      # 管理员后台
pnpm create-saas-app merchant-portal  # 商户后台
pnpm create-saas-app customer-center  # 客户中心

# 所有应用共享 @repo/* 基建包
# 统一的开发规范和代码风格
```

### 场景 3: 团队协作开发

```bash
# 团队成员 A 创建应用
pnpm create-saas-app project-alpha

# 提交到 Git
git add apps/project-alpha
git commit -m "feat: 初始化 project-alpha"
git push

# 团队成员 B 拉取代码
git pull
cd apps/project-alpha
pnpm install  # 安装依赖
pnpm dev      # 开始开发
```

---

## 🔧 自动配置内容

### 1. package.json

自动配置为：

```json
{
  "name": "@apps/my-admin",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@repo/design-system": "workspace:*",
    "@repo/rbac": "workspace:*",
    "@repo/state-management": "workspace:*",
    "@repo/request": "workspace:*",
    "@repo/charts": "workspace:*",
    "@repo/internationalization": "workspace:*",
    // ... 其他依赖
  }
}
```

### 2. .env.development

自动生成：

```env
# API 基础地址
VITE_API_BASE_URL=http://localhost:3001

# 是否启用模拟认证（开发时可以不依赖后端）
VITE_USE_MOCK_AUTH=true

# 应用标题
VITE_APP_TITLE=my-admin 管理后台

# 应用环境
VITE_APP_ENV=development
```

### 3. 工作区配置

自动检查和更新 `pnpm-workspace.yaml`：

```yaml
packages:
  - 'apps/*'      # 如果不存在会自动添加
  - 'packages/*'
  - 'templates/*'
```

---

## 📚 完整文档说明

每个创建的应用都包含完整文档：

| 文档 | 内容 | 何时阅读 |
|------|------|----------|
| **README.md** | 项目概述和快速开始 | ⭐⭐⭐ 首先阅读 |
| **QUICK_START.md** | 5分钟快速上手 | ⭐⭐⭐ 立即开始 |
| **LOGIN_TEST_GUIDE.md** | 登录功能测试 | ⭐⭐⭐ 测试时阅读 |
| **TESTING_SUMMARY.md** | 测试清单 | ⭐⭐ 测试参考 |
| **USAGE.md** | 详细使用文档 | ⭐⭐ 开发时参考 |
| **ARCHITECTURE.md** | 架构设计说明 | ⭐ 深入了解 |
| **IMPORT_GUIDE.md** | 组件导入指南 | ⭐ 遇到导入问题时 |
| **VITE_COMPATIBILITY.md** | 兼容性说明 | ⭐ 技术细节 |

---

## 🎨 自定义模板

### 修改默认模板

如果您想自定义默认模板：

1. **编辑模板文件**
   ```bash
   cd templates/saas-admin
   # 修改您想要的文件
   ```

2. **测试修改**
   ```bash
   pnpm create-saas-app test-app
   cd apps/test-app
   pnpm dev
   ```

3. **应用到所有新项目**
   ```bash
   # 所有后续创建的应用都会使用新模板
   pnpm create-saas-app project-1
   pnpm create-saas-app project-2
   ```

### 常见自定义场景

**1. 修改默认主题**
```typescript
// templates/saas-admin/src/App.tsx
<ThemeProvider defaultTheme="dark">  {/* 改为暗色主题 */}
```

**2. 添加新的功能模块**
```bash
cd templates/saas-admin/src/features
mkdir products
# 创建产品管理模块
```

**3. 修改默认路由**
```typescript
// templates/saas-admin/src/core/router/index.tsx
// 添加或修改路由配置
```

---

## 🐛 故障排除

### 问题 1: 应用已存在

```
❌ 应用 "my-admin" 已存在！
```

**解决方案：**
```bash
# 方案 A: 删除现有应用
rm -rf apps/my-admin
pnpm create-saas-app my-admin

# 方案 B: 使用不同名称
pnpm create-saas-app my-admin-v2
```

### 问题 2: 找不到模板

```
❌ 找不到 saas-admin 模板！
```

**解决方案：**
```bash
# 1. 确保在项目根目录
pwd  # 应该显示项目根路径

# 2. 检查模板是否存在
ls -la templates/saas-admin

# 3. 如果模板不存在，检查是否在正确的分支
git branch
```

### 问题 3: 依赖安装失败

```
❌ 依赖安装失败，但项目已创建
```

**解决方案：**
```bash
# 手动安装依赖
cd apps/my-admin
pnpm install

# 如果还是失败，清除缓存
pnpm store prune
pnpm install
```

### 问题 4: 端口被占用

```
Port 5173 is in use
```

**解决方案：**
```bash
# Vite 会自动使用下一个可用端口（5174, 5175...）
# 或者手动指定端口
pnpm dev --port 3000
```

---

## 💡 最佳实践

### 1. 命名规范

```bash
# ✅ 推荐：描述性名称
pnpm create-saas-app user-management
pnpm create-saas-app order-system
pnpm create-saas-app analytics-dashboard

# ❌ 避免：过于简单的名称
pnpm create-saas-app app1
pnpm create-saas-app test
pnpm create-saas-app new
```

### 2. 项目组织

```
apps/
├── admin-panel/           # 管理员后台
├── merchant-portal/       # 商户门户
├── customer-center/       # 客户中心
└── analytics-dashboard/   # 数据分析

packages/
├── design-system/         # 共享UI组件
├── rbac/                  # 权限控制
└── ...                    # 其他基建包
```

### 3. 开发流程

```bash
# 1. 创建应用
pnpm create-saas-app my-project

# 2. 进入目录
cd apps/my-project

# 3. 启动开发服务器
pnpm dev

# 4. 编写代码（Feature-First）
# 在 src/features/ 下创建新功能模块

# 5. 构建生产版本
pnpm build

# 6. 预览构建结果
pnpm preview
```

### 4. 版本控制

```bash
# 创建后立即提交
git add apps/my-admin
git commit -m "feat: initialize my-admin application"

# 为每个应用创建独立分支（可选）
git checkout -b feature/my-admin
```

### 5. 环境管理

```bash
# 开发环境
cp .env.example .env.development
# VITE_USE_MOCK_AUTH=true

# 生产环境
cp .env.example .env.production
# VITE_USE_MOCK_AUTH=false
# VITE_API_BASE_URL=https://api.production.com
```

---

## 🎯 与 Next.js 的对比

| 特性 | Next.js | SaaS Admin 模板 |
|------|---------|----------------|
| 创建命令 | `npx create-next-app` | `pnpm create-saas-app` |
| 框架 | Next.js (SSR) | Vite + React (SPA) |
| 路由 | 文件系统路由 | React Router |
| 模板类型 | 通用网站 | SaaS 管理后台 |
| 内置功能 | 基础模板 | 认证+权限+状态管理 |
| 启动时间 | ~3s | ~160ms |
| HMR 速度 | ~500ms | ~100ms |
| Monorepo | 需要配置 | 原生支持 |

---

## 🚀 高级用法

### 批量创建应用

```bash
#!/bin/bash
# create-multiple-apps.sh

apps=(
  "admin-panel"
  "merchant-portal"
  "customer-center"
  "analytics-dashboard"
)

for app in "${apps[@]}"; do
  echo "Creating $app..."
  pnpm create-saas-app "$app"
done
```

### 自动化部署脚本

```bash
#!/bin/bash
# deploy-app.sh

APP_NAME=$1

cd "apps/$APP_NAME"
pnpm build
pnpm preview
# 或部署到云服务
```

### CI/CD 集成

```yaml
# .github/workflows/deploy.yml
name: Deploy SaaS App

on:
  push:
    paths:
      - 'apps/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm build
      - run: pnpm deploy
```

---

## 📊 性能指标

使用脚手架创建的应用具有出色的性能：

| 指标 | 数值 |
|------|------|
| 冷启动时间 | ~160ms |
| HMR 热更新 | <100ms |
| 首次构建 | ~3-5s |
| 生产构建 | ~5-10s |
| Vendor 包大小 | ~300KB (gzip) |
| App 包大小 | ~50KB (gzip) |

---

## 🎉 总结

### 您现在拥有

✅ **一条命令创建** - 就像 `create-next-app` 一样简单  
✅ **完整的模板** - 认证+权限+状态管理  
✅ **统一的标准** - 团队协作无障碍  
✅ **快速开发** - 模拟认证无需后端  
✅ **生产就绪** - 所有问题已修复  
✅ **完整文档** - 10+ 详细文档  

### 立即开始

```bash
pnpm create-saas-app my-first-admin
cd apps/my-first-admin
pnpm dev
```

**🚀 3 分钟创建，5 分钟启动，立即开发！**

---

## 📞 获取帮助

- 📖 查看 `scripts/README.md` - 脚手架详细说明
- 📖 查看应用内的文档 - 完整使用指南
- 🐛 遇到问题查看 `FIXES.md` - 常见问题

---

**✨ 祝您开发愉快！** 🎈

