/**
 * 开发环境模拟认证服务
 * 用于在没有真实后端时快速测试前端功能
 */

import type { User, LoginResponse } from '@repo/rbac';

// 模拟用户数据库
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123',
    name: '管理员',
    role: 'admin' as const,
    permissions: ['*'], // 所有权限
  },
  {
    id: '2',
    email: 'user@example.com',
    password: 'user123',
    name: '普通用户',
    role: 'user' as const,
    permissions: ['dashboard:read', 'settings:read'],
  },
];

/**
 * 生成简单的模拟 JWT Token
 */
function generateMockToken(user: typeof MOCK_USERS[0]): string {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    permissions: user.permissions,
    exp: Math.floor(Date.now() / 1000) + 3600, // 1小时后过期
  };
  
  // 在实际应用中，这应该是真正的 JWT。这里为了开发方便使用 Base64
  return btoa(JSON.stringify(payload));
}

/**
 * 模拟登录 API
 */
export async function mockLogin(
  email: string,
  password: string
): Promise<LoginResponse> {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 500));

  // 查找用户
  const user = MOCK_USERS.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    throw new Error('邮箱或密码错误');
  }

  // 生成 Token
  const token = generateMockToken(user);
  const refreshToken = generateMockToken(user);

  // 构造响应
  const response: LoginResponse = {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      permissions: user.permissions,
    },
    token,
    refreshToken,
  };

  return response;
}

/**
 * 模拟刷新 Token API
 */
export async function mockRefreshToken(
  refreshToken: string
): Promise<LoginResponse> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  try {
    // 解析 token
    const payload = JSON.parse(atob(refreshToken));
    const user = MOCK_USERS.find((u) => u.id === payload.userId);

    if (!user) {
      throw new Error('Invalid refresh token');
    }

    const newToken = generateMockToken(user);
    const newRefreshToken = generateMockToken(user);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        permissions: user.permissions,
      },
      token: newToken,
      refreshToken: newRefreshToken,
    };
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
}

/**
 * 检查是否启用模拟认证
 */
export function isMockAuthEnabled(): boolean {
  return import.meta.env.VITE_USE_MOCK_AUTH === 'true';
}

