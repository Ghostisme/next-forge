# 🚀 快速开始指南

## 前置要求

- Node.js >= 20
- pnpm >= 10
- 基础的 React 和 TypeScript 知识

## 安装步骤

### 1. 克隆项目（或在 monorepo 中）

\`\`\`bash
# 如果是独立使用
git clone <repository-url>
cd templates/saas-admin

# 如果在 monorepo 中
cd templates/saas-admin
\`\`\`

### 2. 安装依赖

\`\`\`bash
# 在 monorepo 根目录
pnpm install

# 或在模板目录
cd templates/saas-admin
pnpm install
\`\`\`

### 3. 配置环境变量

复制环境变量模板：

\`\`\`bash
cp .env.example .env.local
\`\`\`

编辑 `.env.local`：

\`\`\`env
# API 配置
VITE_API_BASE_URL=http://localhost:3001

# 应用配置
VITE_APP_TITLE=我的SaaS管理后台
VITE_APP_VERSION=1.0.0

# 功能开关
VITE_ENABLE_MOCK=false
VITE_ENABLE_DEBUG=true
\`\`\`

### 4. 启动开发服务器

\`\`\`bash
pnpm dev
\`\`\`

打开浏览器访问 http://localhost:5173

### 5. 登录系统

默认测试账号：
- 邮箱：admin@example.com
- 密码：password

## 项目结构说明

\`\`\`
templates/saas-admin/
├── src/
│   ├── core/              # 核心配置（路由等）
│   ├── features/          # 功能模块
│   │   ├── auth/         # 认证模块
│   │   ├── dashboard/    # 仪表板
│   │   ├── users/        # 用户管理
│   │   └── settings/     # 设置
│   ├── shared/            # 共享资源
│   │   ├── components/   # 共享组件
│   │   ├── layouts/      # 布局
│   │   └── hooks/        # 共享hooks
│   ├── styles/            # 样式
│   ├── App.tsx           # 应用入口
│   └── main.tsx          # 主文件
├── public/                # 静态资源
├── vite.config.ts        # Vite 配置
├── tsconfig.json         # TS 配置
└── package.json          # 依赖管理
\`\`\`

## 开发第一个功能

### 1. 创建新的功能模块

\`\`\`bash
mkdir -p src/features/products
mkdir -p src/features/products/pages
mkdir -p src/features/products/components
\`\`\`

### 2. 创建模块入口

\`\`\`typescript
// src/features/products/index.tsx
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@shared/layouts/MainLayout';
import { ProductListPage } from './pages/ProductListPage';

export default function ProductsFeature() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<ProductListPage />} />
      </Route>
    </Routes>
  );
}
\`\`\`

### 3. 创建页面

\`\`\`typescript
// src/features/products/pages/ProductListPage.tsx
import { Card, Button } from '@repo/design-system';

export function ProductListPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">产品列表</h1>
      <Card className="p-6">
        <p>产品列表内容</p>
        <Button>添加产品</Button>
      </Card>
    </div>
  );
}
\`\`\`

### 4. 注册路由

\`\`\`typescript
// src/core/router/index.tsx
import { lazy } from 'react';

const ProductsFeature = lazy(() => import('@features/products'));

// 在 Routes 中添加
<Route
  path="/products/*"
  element={
    <ProtectedRoute>
      <ProductsFeature />
    </ProtectedRoute>
  }
/>
\`\`\`

### 5. 添加导航链接

在侧边栏或菜单中添加链接：

\`\`\`typescript
import { Link } from 'react-router-dom';

<Link to="/products">产品管理</Link>
\`\`\`

## 常用命令

\`\`\`bash
# 开发
pnpm dev              # 启动开发服务器
pnpm build            # 构建生产版本
pnpm preview          # 预览生产构建

# 代码质量
pnpm lint             # 运行 ESLint
pnpm lint:fix         # 自动修复 ESLint 错误
pnpm format           # 格式化代码
pnpm typecheck        # TypeScript 类型检查

# 清理
pnpm clean            # 清理构建产物
\`\`\`

## 下一步

- 阅读 [功能模块开发指南](./FEATURE_DEVELOPMENT.md)
- 学习 [API 调用规范](./API_GUIDE.md)
- 了解 [部署流程](./DEPLOYMENT.md)

## 常见问题

### Q: 启动失败怎么办？

A: 检查以下几点：
1. Node.js 版本是否 >= 20
2. 是否在 monorepo 根目录安装了依赖
3. 环境变量是否正确配置

### Q: 如何修改默认端口？

A: 编辑 `vite.config.ts`：

\`\`\`typescript
server: {
  port: 3000,  // 改为你想要的端口
}
\`\`\`

### Q: 如何添加新的基建包？

A: 在 `package.json` 中添加依赖，然后在 `vite.config.ts` 的 `resolve.alias` 中配置别名。

---

**祝你开发愉快！** 🎉

