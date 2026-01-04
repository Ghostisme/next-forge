# 📖 SaaS 管理后台使用指南

## 🎯 模板定位

这是一个**标准化的 Vite+React SPA 管理后台模板**，专为快速构建 SaaS 管理后台而设计。

### 核心目标

1. **快速搭建** - 开箱即用，无需复杂配置
2. **统一规范** - 统一的代码结构和开发规范
3. **提升效率** - 通过模块化快速开发业务页面
4. **兼容基建** - 完美兼容 monorepo 中的 Next.js 基建包

## ✅ 已解决的兼容性问题

### 1. Next.js 基建包与 Vite 的兼容

**问题**：Next.js 基建包使用了 Next.js 特定的 API 和环境变量

**解决方案**：

\`\`\`typescript
// vite.config.ts
export default defineConfig({
  // 1. 路径别名 - 正确映射所有 @repo/* 包
  resolve: {
    alias: {
      '@repo/rbac': path.resolve(__dirname, '../../packages/rbac'),
      '@repo/request': path.resolve(__dirname, '../../packages/request'),
      // ... 所有基建包
    },
    dedupe: ['react', 'react-dom'],
  },
  
  // 2. 全局变量定义 - 兼容 Next.js 环境
  define: {
    'process.env': env,
    'global': 'globalThis',
    '__dirname': JSON.stringify(''),
    '__filename': JSON.stringify(''),
  },
  
  // 3. 依赖优化 - 排除 workspace 包
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['@repo/*'],  // 不预构建 workspace 包
  },
});
\`\`\`

### 2. 环境变量兼容

**Next.js 方式**：
\`\`\`typescript
process.env.NEXT_PUBLIC_API_URL
\`\`\`

**Vite 方式**：
\`\`\`typescript
import.meta.env.VITE_API_URL
\`\`\`

**兼容处理**：
- 在 `vite.config.ts` 中定义 `process.env`
- 在 `vite-env.d.ts` 中添加类型定义
- 统一使用 `import.meta.env.VITE_*` 命名

### 3. 模块解析兼容

**问题**：Next.js 使用 `NodeNext` 模块解析，Vite 使用 `bundler`

**解决方案**：
\`\`\`json
// tsconfig.json
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "bundler",  // Vite 推荐
    "jsx": "react-jsx"
  }
}
\`\`\`

## 🚀 快速使用

### 方式一：直接使用模板

\`\`\`bash
# 1. 在 monorepo 根目录安装依赖
pnpm install

# 2. 进入模板目录
cd templates/saas-admin

# 3. 启动开发服务器
pnpm dev

# 访问 http://localhost:5173
\`\`\`

### 方式二：复制模板到 apps/

\`\`\`bash
# 1. 复制模板
cp -r templates/saas-admin apps/admin

# 2. 更新 package.json 的 name
# 将 "@templates/saas-admin" 改为 "admin"

# 3. 安装依赖
pnpm install

# 4. 启动
cd apps/admin
pnpm dev
\`\`\`

## 📦 完整的基建包集成

本模板集成了核心 monorepo 基建包：

\`\`\`json
{
  "dependencies": {
    "@repo/design-system": "workspace:*",      // UI 组件库
    "@repo/rbac": "workspace:*",                // 认证和权限
    "@repo/state-management": "workspace:*",    // 状态管理
    "@repo/request": "workspace:*",             // HTTP 请求
    "@repo/charts": "workspace:*",              // 图表组件
    "@repo/internationalization": "workspace:*", // 国际化
    "@tanstack/react-query": "^5.62.15",       // 服务端状态
    "zustand": "^5.0.3"                         // 客户端状态
  }
}
\`\`\`

### 可选基建包

**@repo/notifications** - Knock 通知服务，需要额外配置：
- 需要 Knock API Key 和 Feed Channel ID
- 参考 `IMPORT_GUIDE.md` 了解如何配置

**简单通知推荐使用内置的 Sonner Toast**：
\`\`\`typescript
import { toast } from '@repo/design-system/components/ui/sonner';

toast.success('操作成功！');
toast.error('操作失败！');
\`\`\`

## 🏗️ Feature-First 架构

### 什么是 Feature-First？

按功能模块组织代码，每个功能模块是独立的、自包含的单元。

### 模块结构

\`\`\`
src/features/[feature-name]/
├── index.tsx           # 模块入口和路由
├── pages/              # 页面组件
├── components/         # 模块私有组件
├── hooks/              # 模块私有 hooks
├── api/                # API 调用
├── stores/             # 模块状态
├── types/              # 类型定义
└── utils/              # 工具函数
\`\`\`

### 创建新功能模块

#### 1. 创建目录结构

\`\`\`bash
mkdir -p src/features/orders
mkdir -p src/features/orders/pages
mkdir -p src/features/orders/components
\`\`\`

#### 2. 创建模块入口

\`\`\`typescript
// src/features/orders/index.tsx
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@shared/layouts/MainLayout';
import { OrderListPage } from './pages/OrderListPage';
import { OrderDetailPage } from './pages/OrderDetailPage';

export default function OrdersFeature() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<OrderListPage />} />
        <Route path=":id" element={<OrderDetailPage />} />
      </Route>
    </Routes>
  );
}
\`\`\`

#### 3. 创建页面

\`\`\`typescript
// src/features/orders/pages/OrderListPage.tsx
import { Card, Button, Table } from '@repo/design-system';
import { useQuery } from '@tanstack/react-query';

export function OrderListPage() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  });
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">订单管理</h1>
        <Button>创建订单</Button>
      </div>
      
      <Card>
        <Table>
          {/* 表格内容 */}
        </Table>
      </Card>
    </div>
  );
}
\`\`\`

#### 4. 注册路由

\`\`\`typescript
// src/core/router/index.tsx
import { lazy } from 'react';

const OrdersFeature = lazy(() => import('@features/orders'));

// 在 Routes 中添加
<Route
  path="/orders/*"
  element={
    <ProtectedRoute permission="orders:read">
      <OrdersFeature />
    </ProtectedRoute>
  }
/>
\`\`\`

## 🎨 使用设计系统

### ⚠️ 重要：正确的导入方式

**本项目采用按需导入，需要从具体路径导入组件：**

\`\`\`typescript
// ✅ 正确的导入方式
import { Button } from '@repo/design-system/components/ui/button';
import { Card, CardContent, CardHeader } from '@repo/design-system/components/ui/card';
import { Input } from '@repo/design-system/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@repo/design-system/components/ui/table';

// ❌ 错误的导入方式
import { Button, Card, Input } from '@repo/design-system';
\`\`\`

**完整的导入指南请查看：[IMPORT_GUIDE.md](./IMPORT_GUIDE.md)**

### 常用组件示例

#### 按钮

\`\`\`typescript
<Button>默认按钮</Button>
<Button variant="outline">轮廓按钮</Button>
<Button variant="ghost">幽灵按钮</Button>
<Button size="sm">小按钮</Button>
<Button size="lg">大按钮</Button>
\`\`\`

#### 表单

\`\`\`typescript
<form onSubmit={handleSubmit}>
  <Input
    type="email"
    placeholder="邮箱"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
  
  <Select
    options={[
      { value: '1', label: '选项1' },
      { value: '2', label: '选项2' },
    ]}
    value={selected}
    onChange={setSelected}
  />
  
  <Button type="submit">提交</Button>
</form>
\`\`\`

#### 卡片和表格

\`\`\`typescript
<Card className="p-6">
  <h3 className="text-lg font-semibold mb-4">用户列表</h3>
  
  <Table>
    <thead>
      <tr>
        <th>姓名</th>
        <th>邮箱</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      {users.map(user => (
        <tr key={user.id}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>
            <Button size="sm">编辑</Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
</Card>
\`\`\`

## 📊 状态管理

### 全局状态（@repo/state-management）

\`\`\`typescript
import {
  useGlobalState,
  useSidebar,
  useTheme,
  useBreadcrumbs,
  useNotifications,
} from '@repo/state-management';

function MyComponent() {
  // 主题管理
  const { theme, setTheme } = useTheme();
  
  // 侧边栏状态
  const { collapsed, toggle } = useSidebar();
  
  // 面包屑
  const { breadcrumbs, setBreadcrumbs } = useBreadcrumbs();
  
  // 通知
  const { notifications, addNotification } = useNotifications();
  
  return <div>...</div>;
}
\`\`\`

### 服务端状态（React Query）

\`\`\`typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function UserList() {
  const queryClient = useQueryClient();
  
  // 查询数据
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000,  // 5分钟
  });
  
  // 修改数据
  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      // 刷新数据
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
  
  return <div>...</div>;
}
\`\`\`

### 模块状态（Zustand）

\`\`\`typescript
// src/features/orders/stores/orderStore.ts
import { create } from 'zustand';

interface OrderStore {
  selectedOrders: string[];
  addOrder: (id: string) => void;
  removeOrder: (id: string) => void;
  clearOrders: () => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  selectedOrders: [],
  addOrder: (id) => set((state) => ({
    selectedOrders: [...state.selectedOrders, id]
  })),
  removeOrder: (id) => set((state) => ({
    selectedOrders: state.selectedOrders.filter(oid => oid !== id)
  })),
  clearOrders: () => set({ selectedOrders: [] }),
}));
\`\`\`

## 🔐 认证和权限

### 使用认证

\`\`\`typescript
import { useAuth } from '@repo/rbac';

function Header() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <Button onClick={() => login('email', 'password')}>登录</Button>;
  }
  
  return (
    <div>
      <span>欢迎, {user?.name}</span>
      <Button onClick={logout}>退出</Button>
    </div>
  );
}
\`\`\`

### 路由权限

\`\`\`typescript
import { ProtectedRoute } from '@repo/rbac';

// 需要登录
<Route path="/dashboard/*" element={
  <ProtectedRoute>
    <DashboardFeature />
  </ProtectedRoute>
} />

// 需要特定权限
<Route path="/users/*" element={
  <ProtectedRoute permission="users:read">
    <UsersFeature />
  </ProtectedRoute>
} />

// 需要管理员角色
<Route path="/settings/*" element={
  <ProtectedRoute role="admin">
    <SettingsFeature />
  </ProtectedRoute>
} />
\`\`\`

### 组件级权限

\`\`\`typescript
import { PermissionWrapper, usePermission } from '@repo/rbac';

function UserActions() {
  const canEdit = usePermission('users:edit');
  const canDelete = usePermission('users:delete');
  
  return (
    <div>
      {canEdit && <Button>编辑</Button>}
      
      <PermissionWrapper permission="users:delete">
        <Button variant="destructive">删除</Button>
      </PermissionWrapper>
    </div>
  );
}
\`\`\`

## 🌐 API 调用

### 使用 @repo/request

\`\`\`typescript
import { apiClient } from '@repo/request';

// GET 请求
const users = await apiClient.get('/api/users');

// POST 请求
const newUser = await apiClient.post('/api/users', {
  name: '张三',
  email: 'zhangsan@example.com',
});

// PUT 请求
const updatedUser = await apiClient.put('/api/users/1', {
  name: '李四',
});

// DELETE 请求
await apiClient.delete('/api/users/1');
\`\`\`

### 结合 React Query

\`\`\`typescript
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiClient } from '@repo/request';

function UserList() {
  // 查询
  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: () => apiClient.get('/api/users'),
  });
  
  // 创建
  const createMutation = useMutation({
    mutationFn: (data) => apiClient.post('/api/users', data),
  });
  
  // 删除
  const deleteMutation = useMutation({
    mutationFn: (id) => apiClient.delete(\`/api/users/\${id}\`),
  });
  
  return <div>...</div>;
}
\`\`\`

## 📈 使用图表

\`\`\`typescript
import { LineChart, BarChart, PieChart } from '@repo/charts';

function Dashboard() {
  const lineData = [
    { name: '1月', value: 400 },
    { name: '2月', value: 600 },
    { name: '3月', value: 800 },
  ];
  
  const barData = [
    { name: '产品A', value: 4000 },
    { name: '产品B', value: 3000 },
    { name: '产品C', value: 2000 },
  ];
  
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">趋势图</h3>
        <div className="h-[300px]">
          <LineChart data={lineData} />
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">柱状图</h3>
        <div className="h-[300px]">
          <BarChart data={barData} />
        </div>
      </Card>
    </div>
  );
}
\`\`\`

## 🎯 最佳实践

### 1. 代码组织

- 按功能模块组织（Feature-First）
- 共享代码放在 `shared/`
- 核心配置放在 `core/`

### 2. 命名规范

- 组件：PascalCase（`UserList.tsx`）
- 函数：camelCase（`formatDate.ts`）
- 常量：UPPER_CASE（`API_ENDPOINTS.ts`）

### 3. 性能优化

- 使用 React.lazy 懒加载路由
- 使用 React Query 缓存服务端数据
- 避免不必要的重渲染

### 4. 类型安全

- 所有组件都要定义 Props 类型
- API 响应要定义类型
- 使用 Zod 验证运行时数据

## 🚀 部署

### 构建生产版本

\`\`\`bash
pnpm build
\`\`\`

### 预览构建

\`\`\`bash
pnpm preview
\`\`\`

### 部署到 Vercel

\`\`\`bash
vercel --prod
\`\`\`

## 📝 总结

这个模板提供了：

✅ **完整的基建集成** - 所有 monorepo 基建包开箱即用  
✅ **兼容性解决** - Next.js 基建与 Vite 完美兼容  
✅ **Feature-First 架构** - 模块化、易扩展  
✅ **统一规范** - 代码风格、命名、结构统一  
✅ **快速开发** - 丰富的示例和文档  
✅ **生产就绪** - 完整的优化和最佳实践  

**开始构建您的 SaaS 应用吧！** 🎉

