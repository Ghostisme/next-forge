# 📦 SaaS Admin 模板说明

## 🎯 模板定位

本模板是 **next-forge** 项目的标准 SaaS 管理后台模板，用于通过脚手架快速创建新的管理后台应用。

## 🚀 使用方式

### 通过脚手架创建（推荐）

```bash
# 在项目根目录执行
pnpm create-saas-app my-admin

# 自动创建到 apps/my-admin/
```

### 手动复制

```bash
# 复制模板到 apps 目录
cp -r templates/saas-admin apps/my-admin

# 修改 package.json 中的名称
# 安装依赖
cd apps/my-admin
pnpm install
```

## 📂 模板结构

```
templates/saas-admin/
├── src/                        # 源代码
│   ├── features/              # 功能模块（Feature-First）
│   │   ├── auth/             # 认证模块
│   │   ├── dashboard/        # 仪表板
│   │   ├── users/            # 用户管理
│   │   └── settings/         # 设置
│   ├── core/                 # 核心功能
│   │   ├── router/           # 路由配置
│   │   ├── services/         # 服务层
│   │   │   └── mock-auth.ts  # 模拟认证服务
│   │   └── providers/        # 全局提供者
│   │       └── MockAuthWrapper.tsx  # 认证拦截器
│   ├── shared/               # 共享资源
│   │   ├── components/       # 共享组件
│   │   │   └── ProtectedRoute.tsx  # Vite 兼容的路由保护
│   │   ├── hooks/            # 自定义 Hooks
│   │   └── utils/            # 工具函数
│   └── App.tsx               # 应用入口
│
├── public/                   # 静态资源
├── .env.example              # 环境变量示例
├── package.json              # 项目配置
├── vite.config.ts            # Vite 配置
├── tsconfig.json             # TypeScript 配置
├── tailwind.config.js        # Tailwind 配置
│
└── 📚 文档/
    ├── README.md             # 项目概述
    ├── QUICK_START.md        # 快速开始
    ├── LOGIN_TEST_GUIDE.md   # 登录测试
    ├── USAGE.md              # 使用文档
    ├── ARCHITECTURE.md       # 架构设计
    ├── IMPORT_GUIDE.md       # 导入指南
    ├── VITE_COMPATIBILITY.md # 兼容性说明
    └── ...更多文档
```

## ✨ 核心特性

### 1. Feature-First 架构

按业务功能组织代码，每个功能模块独立：

```
features/
├── auth/              # 认证功能
│   ├── pages/        # 页面组件
│   ├── components/   # 功能组件
│   ├── hooks/        # 自定义 Hooks
│   ├── services/     # API 服务
│   ├── types/        # 类型定义
│   └── index.tsx     # 模块入口
```

### 2. 模拟认证系统

开发时无需后端，通过环境变量控制：

```typescript
// src/core/services/mock-auth.ts
// 提供模拟用户数据和认证逻辑

// src/core/providers/MockAuthWrapper.tsx
// 拦截 fetch 请求，根据环境变量决定使用模拟/真实 API
```

### 3. Vite 兼容层

处理 Next.js 基建包的兼容性：

```typescript
// src/shared/components/ProtectedRoute.tsx
// Vite 原生版本的路由保护组件
// 使用 react-router-dom 替代 next/navigation
```

### 4. 完整的基建集成

自动集成所有 `@repo/*` 包：
- `@repo/design-system` - UI 组件库
- `@repo/rbac` - 权限控制
- `@repo/state-management` - 状态管理
- `@repo/request` - HTTP 请求
- `@repo/charts` - 图表组件
- `@repo/internationalization` - 国际化

## 🔧 配置说明

### package.json

```json
{
  "name": "@templates/saas-admin",  // 脚手架会自动替换
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    // 所有必需的 @repo/* 包
    // 所有必需的第三方依赖
  }
}
```

### vite.config.ts

```typescript
export default defineConfig({
  // React 插件
  plugins: [react()],
  
  // 路径别名
  resolve: {
    alias: {
      '@': './src',
      '@features': './src/features',
      '@shared': './src/shared',
      '@core': './src/core',
      '@repo/*': '../../packages/*'
    }
  },
  
  // API 代理
  server: {
    proxy: {
      '/api': 'http://localhost:3001'
    }
  },
  
  // 构建优化
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'state-vendor': ['zustand', 'immer'],
          // ...更多分块
        }
      }
    }
  }
})
```

### .env.example

```env
# API 基础地址
VITE_API_BASE_URL=http://localhost:3001

# 是否启用模拟认证
VITE_USE_MOCK_AUTH=true

# 应用标题
VITE_APP_TITLE=SaaS 管理后台

# 应用环境
VITE_APP_ENV=development
```

## 🎨 自定义模板

### 修改默认配置

如果您想为所有新创建的应用修改默认配置：

1. **修改主题**
```typescript
// src/App.tsx
<ThemeProvider defaultTheme="dark">  // 改为暗色主题
```

2. **添加功能模块**
```bash
cd src/features
mkdir products
# 创建产品管理模块
```

3. **修改路由**
```typescript
// src/core/router/index.tsx
// 添加或修改路由配置
```

4. **修改环境变量**
```env
// .env.example
VITE_API_BASE_URL=http://your-default-backend:port
```

### 添加新的共享组件

```bash
cd src/shared/components
# 创建新的共享组件
```

### 修改构建配置

```typescript
// vite.config.ts
// 修改构建选项、代理配置等
```

## 📝 文档维护

模板包含的文档应保持更新：

- `README.md` - 项目概述，首次阅读
- `QUICK_START.md` - 快速开始指南
- `LOGIN_TEST_GUIDE.md` - 登录测试详细步骤
- `USAGE.md` - 详细使用文档
- `ARCHITECTURE.md` - 架构设计说明
- `IMPORT_GUIDE.md` - 组件导入指南
- `VITE_COMPATIBILITY.md` - Vite 兼容性处理
- `FIXES.md` - 已修复的问题列表

## 🔄 版本更新

当更新模板时：

1. **修改模板文件**
```bash
cd templates/saas-admin
# 修改需要更新的文件
```

2. **测试更新**
```bash
cd ../..
pnpm create-saas-app test-app
cd apps/test-app
pnpm dev
# 测试是否正常工作
```

3. **清理测试应用**
```bash
cd ../..
rm -rf apps/test-app
```

4. **提交更新**
```bash
git add templates/saas-admin
git commit -m "feat: update saas-admin template"
```

## 🎯 设计原则

### 1. 开箱即用
- 所有配置预先完成
- 依赖自动安装
- 模拟认证支持

### 2. 统一规范
- Feature-First 架构
- 统一的代码风格
- 统一的导入方式

### 3. 高度可维护
- 清晰的目录结构
- 完整的类型定义
- 详细的文档说明

### 4. 易于扩展
- 模块化设计
- 插件化架构
- 灵活的配置

### 5. 生产就绪
- 性能优化
- 错误处理
- 安全性考虑

## 🚀 性能指标

模板创建的应用具有出色的性能：

- 冷启动: ~160ms
- HMR: <100ms
- 首次构建: ~3-5s
- Vendor 包: ~300KB (gzip)
- App 包: ~50KB (gzip)

## 🐛 已知问题

所有已知问题已修复：

- ✅ Fix 1: Spinner 组件导入问题
- ✅ Fix 2: NotificationProvider 依赖问题
- ✅ Fix 3: immer 依赖缺失
- ✅ Fix 4: next/navigation 不兼容

详见 `FIXES.md` 和 `ALL_FIXES_COMPLETE.md`

## 📞 获取帮助

- 查看模板内的文档
- 查看 `scripts/README.md` - 脚手架说明
- 查看 `CREATE_SAAS_APP_GUIDE.md` - 完整指南

## 📄 许可证

MIT

---

**✨ 这是一个生产就绪的标准模板！**

