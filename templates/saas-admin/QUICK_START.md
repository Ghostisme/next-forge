# 🚀 快速开始指南

本指南将帮助您在 5 分钟内启动并运行 SaaS 管理后台。

## 1. 安装依赖

```bash
cd templates/saas-admin
pnpm install
```

## 2. 配置环境变量

创建 `.env.development` 文件（或复制 `.env.example`）：

```bash
# 复制示例配置
cp .env.example .env.development
```

编辑 `.env.development`：

```env
# API 基础地址（如果有后端）
VITE_API_BASE_URL=http://localhost:3001

# 开发时启用模拟认证（无需后端即可测试）
VITE_USE_MOCK_AUTH=true

# 应用标题
VITE_APP_TITLE=SaaS 管理后台

# 环境
VITE_APP_ENV=development
```

## 3. 启动开发服务器

```bash
pnpm dev
```

浏览器将自动打开 `http://localhost:5173`

## 4. 登录测试

### 开发模式（VITE_USE_MOCK_AUTH=true）

无需后端，直接使用以下测试账号登录：

| 角色 | 邮箱 | 密码 | 权限 |
|------|------|------|------|
| 管理员 | `admin@example.com` | `admin123` | 全部权限 |
| 普通用户 | `user@example.com` | `user123` | 有限权限 |

### 生产模式（VITE_USE_MOCK_AUTH=false）

需要配置真实的后端 API：

1. 设置 `VITE_API_BASE_URL` 为您的后端地址
2. 确保后端提供以下 API 端点：
   - `POST /api/auth/login` - 登录
   - `POST /api/auth/refresh` - 刷新 token
   - `POST /api/auth/logout` - 登出

## 5. 开始开发

### 目录结构

```
src/
├── features/        # 功能模块（Feature-First架构）
│   ├── auth/       # 认证模块
│   ├── dashboard/  # 仪表板模块
│   ├── users/      # 用户管理模块
│   └── settings/   # 设置模块
├── core/           # 核心功能
│   ├── router/     # 路由配置
│   ├── services/   # 服务层
│   └── providers/  # 全局提供者
└── shared/         # 共享资源
    ├── components/ # 共享组件
    ├── hooks/      # 共享 Hooks
    └── utils/      # 工具函数
```

### 创建新功能模块

```bash
# 在 src/features 下创建新模块
mkdir -p src/features/products
cd src/features/products

# 创建标准目录结构
mkdir pages components hooks services types
touch index.tsx
```

### 使用共享包

```typescript
// 使用设计系统组件
import { Button } from '@repo/design-system/components/ui/button';
import { Card } from '@repo/design-system/components/ui/card';

// 使用权限控制
import { useAuth, ProtectedRoute } from '@repo/rbac';

// 使用状态管理
import { useGlobalStore } from '@repo/state-management';

// 使用国际化
import { useTranslation } from '@repo/internationalization';

// 使用图表
import { BarChart } from '@repo/charts';

// 使用请求库
import { request } from '@repo/request';
```

## 6. 构建生产版本

```bash
# 构建
pnpm build

# 预览构建结果
pnpm preview
```

## 常见问题

### Q: 为什么登录后没有跳转？

A: 检查以下几点：
1. 确保 `VITE_USE_MOCK_AUTH=true`（开发模式）
2. 查看浏览器控制台是否有错误
3. 检查 Network 标签页，看登录请求是否成功

### Q: 如何关闭模拟认证？

A: 将 `.env.development` 中的 `VITE_USE_MOCK_AUTH` 设置为 `false`，并配置真实的 `VITE_API_BASE_URL`。

### Q: 如何添加新的路由？

A: 编辑 `src/core/router/index.tsx`：

```typescript
// 1. 懒加载模块
const ProductsFeature = lazy(() => import('@features/products'));

// 2. 添加路由
<Route
  path="/products/*"
  element={
    <ProtectedRoute requiredPermission="products:read">
      <ProductsFeature />
    </ProtectedRoute>
  }
/>
```

### Q: 如何自定义主题？

A: 编辑 `tailwind.config.js` 中的主题配置，或在组件中使用 `ThemeProvider` 提供的主题切换功能。

## 下一步

- 📖 阅读 [USAGE.md](./USAGE.md) 了解详细使用说明
- 🎨 阅读 [IMPORT_GUIDE.md](./IMPORT_GUIDE.md) 了解如何正确导入组件
- 🔧 阅读 [VITE_COMPATIBILITY.md](./VITE_COMPATIBILITY.md) 了解 Vite 兼容性处理
- 📝 阅读 [ARCHITECTURE.md](./ARCHITECTURE.md) 了解架构设计

## 获取帮助

如果遇到问题：

1. 查看 [FIXES.md](./FIXES.md) - 常见问题和解决方案
2. 查看 [ALL_FIXES_COMPLETE.md](./ALL_FIXES_COMPLETE.md) - 已修复的所有问题
3. 查看浏览器控制台错误信息
4. 检查终端错误输出

---

**祝您开发愉快！** 🎉

