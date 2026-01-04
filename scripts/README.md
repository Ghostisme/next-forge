# 🛠️ 脚手架工具

本目录包含用于快速创建 SaaS 应用的脚手架工具。

## 📦 create-saas-app

快速创建一个基于 `saas-admin` 模板的新 SaaS 应用。

### 使用方法

#### 方式 1: 使用 pnpm 脚本（推荐）

```bash
pnpm create-saas-app my-admin
```

#### 方式 2: 直接运行 Node.js 脚本

```bash
node scripts/create-saas-app.js my-admin
```

#### 方式 3: 使用 Bash 脚本（Linux/Mac）

```bash
chmod +x scripts/create-saas-app.sh
./scripts/create-saas-app.sh my-admin
```

### 命名规则

应用名称必须：
- ✅ 只包含小写字母（a-z）
- ✅ 可以包含数字（0-9）
- ✅ 可以包含连字符（-）
- ❌ 不能包含大写字母
- ❌ 不能包含特殊字符
- ❌ 不能包含空格

### 示例

```bash
# ✅ 正确
pnpm create-saas-app my-admin
pnpm create-saas-app crm-system
pnpm create-saas-app dashboard-v2

# ❌ 错误
pnpm create-saas-app MyAdmin      # 包含大写字母
pnpm create-saas-app my_admin     # 包含下划线
pnpm create-saas-app "my admin"   # 包含空格
```

## 🎯 功能特性

### 自动化处理

脚手架会自动：
1. ✅ 复制 `saas-admin` 模板到 `apps/` 目录
2. ✅ 更新 `package.json` 中的应用名称
3. ✅ 创建 `.env.development` 环境配置
4. ✅ 替换模板中的占位符
5. ✅ 安装所有依赖
6. ✅ 配置工作区

### 开箱即用

创建后的应用包含：
- ✅ 完整的 Vite + React + TypeScript 配置
- ✅ Feature-First 架构
- ✅ 模拟认证系统
- ✅ 权限控制（RBAC）
- ✅ 状态管理（Zustand）
- ✅ 路由系统（React Router）
- ✅ 所有 @repo/* 包集成
- ✅ 完整文档

## 📁 生成的目录结构

```
apps/
└── my-admin/                    # 您的新应用
    ├── src/
    │   ├── features/           # 功能模块
    │   │   ├── auth/          # 认证模块
    │   │   ├── dashboard/     # 仪表板模块
    │   │   ├── users/         # 用户管理模块
    │   │   └── settings/      # 设置模块
    │   ├── core/              # 核心功能
    │   │   ├── router/        # 路由配置
    │   │   ├── services/      # 服务层
    │   │   └── providers/     # 全局提供者
    │   ├── shared/            # 共享资源
    │   └── App.tsx            # 应用入口
    ├── public/                # 静态资源
    ├── .env.development       # 开发环境配置
    ├── .env.example           # 环境变量示例
    ├── package.json           # 项目配置
    ├── vite.config.ts         # Vite 配置
    ├── tsconfig.json          # TypeScript 配置
    └── 文档/                  # 完整文档
```

## 🚀 快速开始

创建应用后：

```bash
# 1. 进入应用目录
cd apps/my-admin

# 2. 启动开发服务器
pnpm dev

# 3. 打开浏览器
# 访问 http://localhost:5173

# 4. 使用测试账号登录
# 管理员: admin@example.com / admin123
# 普通用户: user@example.com / user123
```

## ⚙️ 环境配置

创建的 `.env.development` 文件：

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

您可以根据需要修改这些配置。

## 📚 文档说明

每个新创建的应用都包含完整文档：

| 文档 | 说明 |
|------|------|
| `QUICK_START.md` | 快速开始指南 |
| `LOGIN_TEST_GUIDE.md` | 登录功能测试 |
| `TESTING_SUMMARY.md` | 测试清单 |
| `USAGE.md` | 详细使用文档 |
| `ARCHITECTURE.md` | 架构设计 |
| `IMPORT_GUIDE.md` | 导入指南 |
| `VITE_COMPATIBILITY.md` | 兼容性说明 |

## 🔧 高级用法

### 自定义模板

如果您想修改模板：

1. 编辑 `templates/saas-admin/` 目录中的文件
2. 重新运行 `pnpm create-saas-app` 创建新应用
3. 新应用将使用更新后的模板

### 批量创建

创建多个应用：

```bash
pnpm create-saas-app admin-panel
pnpm create-saas-app customer-portal
pnpm create-saas-app analytics-dashboard
```

### 连接真实后端

修改 `.env.development`：

```env
VITE_USE_MOCK_AUTH=false
VITE_API_BASE_URL=http://your-backend:port
```

## 🐛 故障排除

### 问题：应用已存在

```bash
❌ 应用 "my-admin" 已存在！
```

**解决方案：**
1. 删除现有应用：`rm -rf apps/my-admin`
2. 或使用不同的应用名称

### 问题：找不到模板

```bash
❌ 找不到 saas-admin 模板！
```

**解决方案：**
1. 确保在项目根目录运行命令
2. 检查 `templates/saas-admin/` 目录是否存在

### 问题：依赖安装失败

```bash
❌ 依赖安装失败，但项目已创建
```

**解决方案：**
```bash
cd apps/my-admin
pnpm install
```

## 💡 最佳实践

1. **命名规范**
   - 使用描述性的名称：`customer-management` 而不是 `app1`
   - 使用连字符分隔：`user-admin` 而不是 `useradmin`

2. **开发流程**
   ```bash
   pnpm create-saas-app my-app    # 创建应用
   cd apps/my-app                 # 进入目录
   pnpm dev                       # 启动开发
   ```

3. **团队协作**
   - 创建后提交到 Git
   - 团队成员只需 `pnpm install` 即可开始开发
   - 使用统一的模板确保代码规范一致

4. **持续更新**
   - 定期更新 `templates/saas-admin/` 模板
   - 新创建的应用会使用最新的模板
   - 已创建的应用可以手动同步更新

## 🎯 使用场景

本脚手架适用于：
- ✅ 快速启动新的 SaaS 项目
- ✅ 创建企业内部管理系统
- ✅ 构建多租户管理后台
- ✅ 开发数据分析平台
- ✅ 搭建 CRM/ERP 系统
- ✅ 任何需要标准化的管理后台

## 🤝 贡献

如果您有改进建议：
1. 更新 `templates/saas-admin/` 模板
2. 更新脚手架脚本
3. 更新文档

## 📄 许可证

MIT

---

**✨ 享受快速开发的乐趣！**

