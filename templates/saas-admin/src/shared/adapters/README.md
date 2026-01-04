# 🔧 Vite 兼容适配器

## 概述

本目录包含了将 Next.js 基建包适配到 Vite 环境的兼容层组件。

## 为什么需要适配器？

`@repo/*` 基建包是为 Next.js 设计的，使用了 Next.js 特定的 API：
- `next/navigation` 的 `useRouter`、`usePathname`
- `next/link` 的 `Link` 组件
- Next.js 的路由系统

这些在 Vite 中无法直接使用，需要适配器将它们转换为 React Router 的等效实现。

## 已适配的组件

### ProtectedRoute
- **位置**: `src/shared/components/ProtectedRoute.tsx`
- **原始**: `@repo/rbac/components/protected-route`
- **差异**: 使用 `react-router-dom` 代替 `next/navigation`

## 使用方式

```typescript
// ❌ 不要从 @repo/rbac 导入
import { ProtectedRoute } from '@repo/rbac';

// ✅ 使用本地适配版本
import { ProtectedRoute } from '@shared/components/ProtectedRoute';
```

## 架构说明

```
Next.js 基建包 (@repo/*)
    ↓
Vite 适配层 (src/shared/components/)
    ↓
Vite 应用
```

这种方式的优点：
1. ✅ 保持 @repo/* 包不变（兼容 Next.js 项目）
2. ✅ Vite 项目通过适配层使用
3. ✅ 清晰的职责分离
4. ✅ 易于维护和更新

