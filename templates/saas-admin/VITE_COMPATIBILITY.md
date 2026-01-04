# 🔄 Vite 兼容性完整解决方案

## 🎯 核心问题

`@repo/*` 基建包是为 Next.js 设计的，使用了 Next.js 特定的 API，无法直接在 Vite 中使用。

### Next.js 特定功能

| 功能 | Next.js API | Vite 替代方案 |
|------|------------|--------------|
| 路由导航 | `useRouter` from `next/navigation` | `useNavigate` from `react-router-dom` |
| 当前路径 | `usePathname` from `next/navigation` | `useLocation` from `react-router-dom` |
| 路由链接 | `<Link>` from `next/link` | `<Link>` from `react-router-dom` |
| 中间件 | `middleware.ts` | 路由守卫组件 |

---

## ✅ 完整解决方案

### 方案架构

```
┌─────────────────────────────────────┐
│   @repo/* 基建包 (Next.js)          │
│   - 保持原样，供 Next.js 使用        │
└─────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│   Vite 适配层                       │
│   - ProtectedRoute (Vite 版本)     │
│   - 其他需要适配的组件               │
└─────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│   Vite 应用                         │
│   - 使用适配后的组件                │
└─────────────────────────────────────┘
```

---

## 📦 已解决的兼容性问题

### 1. ✅ ProtectedRoute 组件

**问题**: 使用了 `next/navigation`

**解决**: 创建 Vite 兼容版本

```typescript
// ❌ Next.js 版本（@repo/rbac）
import { useRouter, usePathname } from 'next/navigation';

// ✅ Vite 版本（本地）
import { useNavigate, useLocation } from 'react-router-dom';
```

**位置**: `src/shared/components/ProtectedRoute.tsx`

### 2. ✅ design-system 组件

**问题**: 需要从具体路径导入

**解决**: 按需导入

```typescript
// ✅ 正确导入
import { Button } from '@repo/design-system/components/ui/button';
```

### 3. ✅ notifications 包

**问题**: 依赖 Knock 服务

**解决**: 使用 Sonner Toast

```typescript
// ✅ 使用内置 Toast
import { toast } from '@repo/design-system/components/ui/sonner';
```

### 4. ✅ immer 依赖

**问题**: state-management 需要但未安装

**解决**: 添加到 dependencies

```json
{
  "dependencies": {
    "immer": "^10.1.1"
  }
}
```

---

## 🚀 使用指南

### 完全兼容的基建包

这些包可以直接使用，无需适配：

```typescript
// ✅ 认证上下文和 hooks
import { AuthProvider, useAuth } from '@repo/rbac';

// ✅ 状态管理
import { StateProvider, useGlobalState, useTheme } from '@repo/state-management';

// ✅ HTTP 请求
import { apiClient } from '@repo/request';

// ✅ 图表组件
import { LineChart, BarChart } from '@repo/charts';

// ✅ 国际化
import { useTranslation } from '@repo/internationalization';

// ✅ UI 组件（按需导入）
import { Button } from '@repo/design-system/components/ui/button';
```

### 需要使用适配版本的组件

```typescript
// ❌ 不要从 @repo/rbac 导入
import { ProtectedRoute } from '@repo/rbac';

// ✅ 使用本地 Vite 兼容版本
import { ProtectedRoute } from '@shared/components/ProtectedRoute';
```

---

## 📝 完整的兼容性清单

### ✅ 已兼容

- [x] AuthProvider - 完全兼容
- [x] useAuth - 完全兼容
- [x] ProtectedRoute - Vite 适配版本
- [x] design-system 组件 - 按需导入
- [x] state-management - 完全兼容（需要 immer）
- [x] request - 完全兼容
- [x] charts - 完全兼容
- [x] internationalization - 完全兼容

### 📦 可选（需手动配置）

- [ ] notifications - 需要 Knock 服务配置

---

## 🔧 如何添加新的适配组件

如果遇到其他 Next.js 特定的组件，按以下步骤适配：

### 1. 识别 Next.js API 使用

```bash
# 搜索 Next.js 导入
grep -r "next/" packages/[package-name]/
```

### 2. 创建 Vite 适配版本

在 `src/shared/components/` 创建新文件：

```typescript
// src/shared/components/MyAdaptedComponent.tsx

// 使用 react-router-dom 替代 next/navigation
import { useNavigate, useLocation } from 'react-router-dom';

// 实现适配逻辑
export function MyAdaptedComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // ...适配实现
}
```

### 3. 在应用中使用适配版本

```typescript
// ❌ 不要从 @repo/* 导入
import { MyComponent } from '@repo/package-name';

// ✅ 使用适配版本
import { MyComponent } from '@shared/components/MyAdaptedComponent';
```

### 4. 更新文档

在 `VITE_COMPATIBILITY.md` 中记录新的适配。

---

## 💡 最佳实践

### 1. 优先使用完全兼容的包

大多数基建包都是完全兼容的，优先使用它们。

### 2. 对不兼容的组件创建适配

只有少数组件（如 ProtectedRoute）需要适配。

### 3. 保持适配层简单

适配组件应该尽可能简单，只做必要的转换。

### 4. 文档化所有适配

在此文件中记录所有适配，方便后续维护。

---

## 🎯 自动化方案（未来规划）

理想情况下，可以通过以下方式实现自动化：

### 方案 A: 条件导出

在 @repo/* 包中使用条件导出：

```json
{
  "exports": {
    ".": {
      "next": "./nextjs/index.ts",
      "default": "./vite/index.ts"
    }
  }
}
```

### 方案 B: 构建时转换

创建构建脚本，自动生成 Vite 兼容版本。

### 方案 C: 运行时适配器

提供运行时适配器，自动检测环境并使用对应的实现。

---

## 📊 兼容性总结

### 完全兼容（无需修改）

- ✅ **AuthProvider / useAuth** - 纯 React 实现
- ✅ **StateProvider / 状态管理 hooks** - 基于 Zustand
- ✅ **apiClient** - 标准 Fetch API
- ✅ **图表组件** - 纯 React 组件
- ✅ **国际化** - 纯 React 实现

### 需要适配（已提供适配版本）

- ⚠️ **ProtectedRoute** - 使用本地版本
- ⚠️ **design-system UI 组件** - 按需导入

### 可选（需手动配置）

- 📦 **notifications** - 需要 Knock 配置

---

## 🎉 结论

通过适配层方案，我们实现了：

1. ✅ **保持基建包不变** - Next.js 项目继续使用
2. ✅ **Vite 项目完全可用** - 通过适配层兼容
3. ✅ **清晰的架构** - 职责分离
4. ✅ **易于维护** - 适配逻辑集中管理

**现在 Vite 项目可以完美使用 Next.js 基建包！** 🚀

---

## 📞 相关文档

- **IMPORT_GUIDE.md** - 组件导入指南
- **ALL_FIXES_COMPLETE.md** - 所有修复总结
- **src/shared/adapters/README.md** - 适配器说明

---

**最后更新**: 2026年1月2日  
**状态**: ✅ 完全兼容

