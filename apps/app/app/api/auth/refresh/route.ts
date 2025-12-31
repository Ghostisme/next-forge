import { NextResponse } from 'next/server';
import type { LoginResponse } from '@repo/rbac';

export async function POST(request: Request) {
  try {
    const { refreshToken } = await request.json();

    // 实际项目中应验证 refresh token
    // 这里简化处理，直接返回新的 token

    const response: LoginResponse = {
      user: {
        id: '1',
        name: '测试用户',
        email: 'test@example.com',
        role: 'admin',
      },
      token: 'new_mock_token',
      refreshToken: 'new_mock_refresh_token',
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: '刷新失败' },
      { status: 401 }
    );
  }
}