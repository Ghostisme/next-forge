# 🧪 登录功能测试指南

## ✅ 当前状态

您的 SaaS 管理后台已经启动成功！

- 🌐 访问地址: `http://localhost:5174/`
- 🔐 模拟认证: **已启用**
- 🚀 开发模式: **已就绪**

## 📝 测试账号

| 角色 | 邮箱 | 密码 | 权限说明 |
|------|------|------|----------|
| 👑 **管理员** | `admin@example.com` | `admin123` | 拥有所有权限，可以访问所有页面 |
| 👤 **普通用户** | `user@example.com` | `user123` | 有限权限，某些页面会受到限制 |

## 🎯 测试步骤

### 1️⃣ 测试管理员登录

1. 打开浏览器访问 `http://localhost:5174/`
2. 应该会自动跳转到登录页面
3. 在登录页面，您会看到一个蓝色的提示框，显示测试账号
4. 输入管理员账号:
   - 邮箱: `admin@example.com`
   - 密码: `admin123`
5. 点击"登录"按钮
6. ✅ **预期结果**: 
   - 登录成功后自动跳转到仪表板 (`/dashboard`)
   - 可以看到欢迎信息
   - 左侧导航栏显示所有菜单项
   - 右上角显示用户头像和名称

### 2️⃣ 测试权限控制

**管理员权限测试:**
1. 登录后，点击侧边栏的"用户管理"
2. ✅ 应该能正常访问（管理员有 `users:read` 权限）
3. 点击"设置"菜单
4. ✅ 应该能正常访问（管理员有 `settings:read` 权限）

**普通用户权限测试:**
1. 登出（点击右上角用户菜单 → 登出）
2. 使用普通用户账号登录:
   - 邮箱: `user@example.com`
   - 密码: `user123`
3. 尝试访问"用户管理"
4. ❌ 应该会被重定向或显示无权限提示（普通用户没有 `users:read` 权限）

### 3️⃣ 测试登出功能

1. 点击右上角的用户头像
2. 在下拉菜单中点击"登出"
3. ✅ **预期结果**:
   - 返回登录页面
   - 本地存储的 token 被清除
   - 无法直接访问受保护的页面

### 4️⃣ 测试路由保护

1. 登出状态下，尝试直接访问 `http://localhost:5174/dashboard`
2. ✅ **预期结果**:
   - 自动重定向到登录页面
   - URL 包含 `returnUrl` 参数
   - 登录成功后会返回原来想访问的页面

## 🔍 技术实现说明

### 模拟认证工作原理

```
登录请求流程:
1. 用户提交邮箱和密码
2. MockAuthWrapper 拦截 fetch 请求
3. 检查 VITE_USE_MOCK_AUTH 环境变量
4. 如果为 true，使用 mockLogin() 模拟认证
5. 返回模拟的用户数据和 token
6. AuthProvider 保存 token 到 localStorage
7. 更新全局认证状态
8. 触发路由跳转
```

### 关键文件

| 文件 | 作用 |
|------|------|
| `src/core/services/mock-auth.ts` | 模拟认证逻辑 |
| `src/core/providers/MockAuthWrapper.tsx` | 拦截 fetch 请求 |
| `src/features/auth/pages/LoginPage.tsx` | 登录页面 UI |
| `src/shared/components/ProtectedRoute.tsx` | 路由保护 |
| `packages/rbac/context/auth-context.tsx` | 认证状态管理 |

### 存储数据

模拟登录成功后，以下数据会存储在浏览器中：

```javascript
// localStorage
{
  "auth_token": "eyJ1c2VySWQiOi4uLn0=",  // Base64 编码的用户信息
  "refresh_token": "eyJ1c2VySWQiOi4uLn0="
}
```

您可以在浏览器的开发者工具中查看:
1. 按 F12 打开开发者工具
2. 切换到 "Application" (Chrome) 或 "Storage" (Firefox) 标签
3. 展开 "Local Storage" → `http://localhost:5174`

## 🐛 调试技巧

### 查看认证状态

在浏览器控制台运行:

```javascript
// 查看当前 token
localStorage.getItem('auth_token')

// 解码 token 查看用户信息
JSON.parse(atob(localStorage.getItem('auth_token')))

// 清除认证状态
localStorage.removeItem('auth_token')
localStorage.removeItem('refresh_token')
```

### 查看网络请求

1. 打开开发者工具的 "Network" 标签
2. 点击登录按钮
3. 查找 `/auth/login` 请求
4. 查看请求和响应内容

控制台应该会看到:
```
🚀 模拟认证已启用
📝 可用测试账号:
   管理员: admin@example.com / admin123
   普通用户: user@example.com / user123
```

### 常见问题

**Q: 登录后页面没有跳转？**

A: 检查以下几点:
1. 打开浏览器控制台，查看是否有 JavaScript 错误
2. 检查 Network 标签，看 `/auth/login` 请求是否成功
3. 验证 `.env.development` 文件中 `VITE_USE_MOCK_AUTH=true`
4. 刷新页面重试

**Q: 提示"邮箱或密码错误"？**

A: 
1. 确认邮箱和密码完全正确（区分大小写）
2. 检查控制台是否显示"模拟认证已启用"
3. 查看 `src/core/services/mock-auth.ts` 中的 MOCK_USERS 数据

**Q: 看不到测试账号提示框？**

A:
1. 确认 `.env.development` 中 `VITE_USE_MOCK_AUTH=true`
2. 重启开发服务器 (Ctrl+C 然后 `pnpm dev`)
3. 清除浏览器缓存后刷新

## 🎨 页面功能说明

### 登录页面
- 📧 邮箱输入框 (必填)
- 🔒 密码输入框 (必填)
- 🚀 开发模式提示框 (仅开发环境显示)
- 🔘 登录按钮 (带加载状态)
- 🎨 响应式设计 (适配移动端)

### 仪表板页面
- 📊 数据统计卡片
- 📈 图表展示
- 🔔 通知列表
- 👥 最近活动

### 用户管理页面
- 📋 用户列表
- 🔍 搜索和筛选
- ➕ 添加用户
- ✏️ 编辑用户
- 🗑️ 删除用户

### 设置页面
- ⚙️ 系统设置
- 🎨 主题切换
- 🌐 语言设置
- 🔔 通知设置

## 🔄 切换到真实后端

当您准备连接真实后端时:

1. **修改 `.env.development`**:
```env
VITE_USE_MOCK_AUTH=false
VITE_API_BASE_URL=http://your-backend-url:port
```

2. **确保后端提供以下 API**:
```
POST /api/auth/login
- Body: { email: string, password: string }
- Response: { user: User, token: string, refreshToken: string }

POST /api/auth/refresh
- Body: { refreshToken: string }
- Response: { user: User, token: string, refreshToken: string }

POST /api/auth/logout
- Headers: { Authorization: Bearer <token> }
- Response: { success: boolean }
```

3. **重启开发服务器**

## 📚 相关文档

- [快速开始指南](./QUICK_START.md) - 项目初始化
- [使用文档](./USAGE.md) - 详细功能说明
- [导入指南](./IMPORT_GUIDE.md) - 组件导入规范
- [架构文档](./ARCHITECTURE.md) - 项目架构设计
- [兼容性说明](./VITE_COMPATIBILITY.md) - Vite 兼容性处理

## 🎉 开始测试吧！

现在您可以:
1. 打开浏览器访问 `http://localhost:5174/`
2. 使用 `admin@example.com` / `admin123` 登录
3. 探索各个页面功能
4. 测试权限控制
5. 查看代码实现

**祝您测试愉快！** 🚀

有任何问题，请查看:
- 浏览器控制台 (F12)
- 开发服务器终端输出
- 相关文档

