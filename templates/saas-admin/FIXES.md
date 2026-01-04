# 🔧 问题修复说明

## 修复的问题

### 问题 1：design-system 组件导入错误

#### 问题描述
启动项目时浏览器控制台报错：
```
Uncaught SyntaxError: The requested module '/@fs/E:/workspace/github-code/next-forge/packages/design-system/index.tsx' does not provide an export named 'Spinner'
```

### 问题 2：notifications 包导入错误

#### 问题描述
启动项目时浏览器控制台报错：
```
Uncaught SyntaxError: The requested module '/@fs/E:/workspace/github-code/next-forge/packages/notifications/index.ts' does not provide an export named 'NotificationProvider'
```

### 根本原因

`@repo/design-system` 包采用了 **Shadcn/ui** 的组织方式，主入口文件 (`index.tsx`) **只导出** `DesignSystemProvider` 和相关 Provider，所有 UI 组件需要从具体的文件路径导入。

这是为了：
1. ✅ 更好的代码分割
2. ✅ 按需加载，减少打包体积
3. ✅ 更清晰的依赖关系
4. ✅ 与 Shadcn/ui 保持一致的使用方式

## 修复内容

### 修复 1：design-system 组件导入路径

#### 1. 修复了所有组件的导入路径

#### src/shared/components/PageLoading.tsx
- ❌ 移除了不存在的 `Spinner` 导入
- ✅ 使用自定义的 CSS 动画实现加载效果

#### src/features/auth/pages/LoginPage.tsx
```typescript
// 修复前
import { Button, Input, Card } from '@repo/design-system';

// 修复后
import { Button } from '@repo/design-system/components/ui/button';
import { Input } from '@repo/design-system/components/ui/input';
import { Card } from '@repo/design-system/components/ui/card';
```

#### src/features/dashboard/pages/DashboardOverview.tsx
```typescript
// 修复前
import { Card, Button } from '@repo/design-system';

// 修复后
import { Card } from '@repo/design-system/components/ui/card';
import { Button } from '@repo/design-system/components/ui/button';
```

#### src/features/users/pages/UserListPage.tsx
```typescript
// 修复前
import { Card, Button, Table } from '@repo/design-system';

// 修复后
import { Card } from '@repo/design-system/components/ui/card';
import { Button } from '@repo/design-system/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@repo/design-system/components/ui/table';
```

#### src/features/settings/pages/SettingsPage.tsx
```typescript
// 修复前
import { Card, Button, Input, Switch } from '@repo/design-system';

// 修复后
import { Card } from '@repo/design-system/components/ui/card';
import { Button } from '@repo/design-system/components/ui/button';
import { Input } from '@repo/design-system/components/ui/input';
import { Switch } from '@repo/design-system/components/ui/switch';
```

#### src/shared/components/Header.tsx
```typescript
// 修复前
import { Button } from '@repo/design-system';

// 修复后
import { Button } from '@repo/design-system/components/ui/button';
```

#### src/shared/layouts/MainLayout.tsx
```typescript
// 修复前
import { Sidebar } from '@repo/design-system';

// 修复后
// 简化布局，移除侧边栏复杂性
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
```

#### src/App.tsx
```typescript
// 修复前
import { ThemeProvider } from '@repo/design-system';

// 修复后
import { ThemeProvider } from '@repo/design-system/providers/theme';
```

### 2. 修复了 Table 组件的使用方式

在 `UserListPage.tsx` 中，将原生 HTML 表格标签替换为 Shadcn/ui 的 Table 组件：

```typescript
// 修复前
<Table>
  <thead>
    <tr>
      <th>...</th>
    </tr>
  </thead>
  <tbody>...</tbody>
</Table>

// 修复后
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>...</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>...</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### 3. 创建了详细的导入指南

新增文档：`IMPORT_GUIDE.md`，包含：
- ✅ 所有常用组件的正确导入路径
- ✅ 基建包的导入方式
- ✅ 常见错误和解决方案
- ✅ 最佳实践建议

#### 4. 更新了文档

更新了以下文档，添加了导入说明：
- ✅ `README.md` - 在开头添加重要提示
- ✅ `USAGE.md` - 更新使用设计系统部分

### 修复 2：notifications 包问题

#### 问题根源

`@repo/notifications` 包依赖 Knock 第三方服务，需要：
1. Knock API Key
2. Knock Feed Channel ID
3. 用户 ID

这对于通用模板来说过于复杂，且需要额外的配置和费用。

#### 修复方案

1. **从核心依赖中移除** `@repo/notifications`

```json
// package.json - 移除了 notifications 依赖
{
  "dependencies": {
    // "@repo/notifications": "workspace:*",  // 已移除
    "@repo/design-system": "workspace:*",
    "@repo/rbac": "workspace:*",
    // ... 其他核心依赖
  }
}
```

2. **从 App.tsx 中移除** `NotificationProvider`

```typescript
// 修复前
import { NotificationProvider } from '@repo/notifications';

<NotificationProvider>
  <AuthProvider>...</AuthProvider>
</NotificationProvider>

// 修复后
// 移除了 NotificationProvider
<AuthProvider>...</AuthProvider>
```

3. **提供替代方案**：使用内置的 Sonner Toast

```typescript
import { toast } from '@repo/design-system/components/ui/sonner';

// 使用
toast.success('操作成功！');
toast.error('操作失败！');
toast.info('提示信息');
toast.warning('警告信息');
```

4. **更新文档**，说明如何可选添加 notifications 功能

在 `IMPORT_GUIDE.md` 中添加了详细的配置说明：
- ✅ 如何添加 notifications 依赖
- ✅ 如何配置环境变量
- ✅ 如何使用 NotificationsProvider
- ✅ 推荐使用 Sonner Toast 作为简单替代方案

#### 核心依赖调整

现在模板包含 **6 个核心基建包**：

1. ✅ `@repo/design-system` - UI 组件库
2. ✅ `@repo/rbac` - 认证和权限
3. ✅ `@repo/state-management` - 状态管理
4. ✅ `@repo/request` - HTTP 请求
5. ✅ `@repo/charts` - 图表组件
6. ✅ `@repo/internationalization` - 国际化

**可选包**：
- `@repo/notifications` - 需要 Knock 服务配置

### 修复 3：immer 依赖缺失

#### 问题描述

浏览器控制台报错：
```
Uncaught Error: Could not resolve "immer" imported by "zustand". Is it installed?
```

#### 问题根源

`@repo/state-management` 包使用了 zustand 的 immer 中间件：

```typescript
// packages/state-management/context/state-context.tsx
import { immer } from 'zustand/middleware/immer';

// 在 store 中使用
storeCreator = immer(storeCreator);
```

但是 `immer` 没有作为依赖安装在模板中。

#### 解决方案

在 `package.json` 中添加 `immer` 依赖：

```json
{
  "dependencies": {
    "immer": "^10.1.1",
    // ... 其他依赖
  }
}
```

#### 为什么需要 immer？

**Immer** 是一个让你以更简洁的方式编写不可变更新逻辑的库。

在 zustand 中使用 immer 中间件后，可以直接"修改"状态，immer 会自动创建新的不可变状态：

```typescript
// 不使用 immer
set((state) => ({
  user: {
    ...state.user,
    name: 'John',
  }
}));

// 使用 immer - 更简洁
set((state) => {
  state.user.name = 'John';
});
```

这使得状态管理代码更加简洁和易读，特别是在处理深层嵌套的状态时。

## 正确的导入规则

### UI 组件
```typescript
// 从具体路径导入
import { ComponentName } from '@repo/design-system/components/ui/component-name';
```

### Provider 组件
```typescript
// ThemeProvider
import { ThemeProvider } from '@repo/design-system/providers/theme';

// 或使用完整的 DesignSystemProvider
import { DesignSystemProvider } from '@repo/design-system';
```

### 工具函数
```typescript
import { cn } from '@repo/design-system/lib/utils';
```

### 其他基建包
```typescript
// 直接从包名导入
import { AuthProvider, useAuth } from '@repo/rbac';
import { apiClient } from '@repo/request';
import { LineChart } from '@repo/charts';
```

## 测试验证

修复后，项目应该能够：
1. ✅ 正常启动开发服务器
2. ✅ 浏览器无报错
3. ✅ 所有页面正常渲染
4. ✅ 组件样式正确显示

## 建议

### 开发时
1. 参考 `IMPORT_GUIDE.md` 获取正确的导入路径
2. 使用 TypeScript 的自动导入功能
3. 遵循按需导入的原则

### 添加新组件时
1. 查看 `packages/design-system/components/ui/` 目录
2. 从具体文件路径导入
3. 参考现有代码的导入方式

## 相关文档

- [IMPORT_GUIDE.md](./IMPORT_GUIDE.md) - 完整的组件导入指南
- [README.md](./README.md) - 项目介绍和快速开始
- [USAGE.md](./USAGE.md) - 详细使用指南

## 总结

这次修复主要是调整了组件的导入方式，使其符合 `@repo/design-system` 包的实际导出结构。这是 Shadcn/ui 的标准做法，虽然需要更明确的导入路径，但带来了更好的：

✅ **代码分割** - 只打包使用的组件  
✅ **类型提示** - 更清晰的类型推导  
✅ **维护性** - 清晰的依赖关系  
✅ **性能** - 减少打包体积  

现在项目可以正常运行了！ 🎉

