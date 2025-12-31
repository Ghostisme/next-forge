import { NextResponse } from 'next/server';
import type { LoginResponse } from '@repo/rbac';

// Mock 用户数据
const mockUsers = [
  {
    email: 'admin@example.com',
    password: 'admin123',
    user: {
      id: '1',
      name: '管理员',
      email: 'admin@example.com',
      role: 'admin' as const,
    },
  },
  {
    email: 'manager@example.com',
    password: 'manager123',
    user: {
      id: '2',
      name: '经理',
      email: 'manager@example.com',
      role: 'manager' as const,
    },
  },
  {
    email: 'user@example.com',
    password: 'user123',
    user: {
      id: '3',
      name: '普通用户',
      email: 'user@example.com',
      role: 'user' as const,
    },
  },
];

// 简单的 JWT 生成函数（实际项目中应使用 jsonwebtoken 库）
function generateToken(userId: string, email: string, role: string): string {
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload = {
    userId,
    email,
    role,
    exp: Math.floor(Date.now() / 1000) + 3600, // 1 小时后过期
    iat: Math.floor(Date.now() / 1000),
  };

  const base64Header = Buffer.from(JSON.stringify(header)).toString('base64url');
  const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = 'mock_signature'; // 实际项目中需要真实签名

  return `${base64Header}.${base64Payload}.${signature}`;
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // 查找用户
    const mockUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!mockUser) {
      return NextResponse.json(
        { error: '邮箱或密码错误' },
        { status: 401 }
      );
    }

    // 生成 Token
    const token = generateToken(
      mockUser.user.id,
      mockUser.user.email,
      mockUser.user.role
    );
    const refreshToken = generateToken(
      mockUser.user.id,
      mockUser.user.email,
      mockUser.user.role
    ); // 实际项目中 refresh token 应有不同的过期时间和密钥

    const response: LoginResponse = {
      user: mockUser.user,
      token,
      refreshToken,
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: '登录失败' },
      { status: 500 }
    );
  }
}