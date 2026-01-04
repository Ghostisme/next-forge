/**
 * 模拟认证包装器
 * 在开发环境中拦截认证请求，使用模拟数据
 */

import { useEffect } from 'react';
import { AuthProvider as RbacAuthProvider } from '@repo/rbac';
import type { ReactNode } from 'react';
import { mockLogin, mockRefreshToken, isMockAuthEnabled } from '../services/mock-auth';

interface MockAuthWrapperProps {
  children: ReactNode;
  apiBaseUrl?: string;
}

/**
 * 拦截 fetch 请求，使用模拟认证
 */
function setupMockAuthInterceptor() {
  if (!isMockAuthEnabled()) {
    return;
  }

  const originalFetch = window.fetch;

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;

    // 拦截登录请求
    if (url.includes('/auth/login') && init?.method === 'POST') {
      try {
        const body = JSON.parse(init.body as string);
        const response = await mockLogin(body.email, body.password);
        
        return new Response(JSON.stringify(response), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: (error as Error).message }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    // 拦截刷新 token 请求
    if (url.includes('/auth/refresh') && init?.method === 'POST') {
      try {
        const body = JSON.parse(init.body as string);
        const response = await mockRefreshToken(body.refreshToken);
        
        return new Response(JSON.stringify(response), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: 'Invalid refresh token' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    // 拦截登出请求（直接返回成功）
    if (url.includes('/auth/logout') && init?.method === 'POST') {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 其他请求正常处理
    return originalFetch(input, init);
  };
}

export function MockAuthWrapper({ children, apiBaseUrl }: MockAuthWrapperProps) {
  useEffect(() => {
    if (isMockAuthEnabled()) {
      console.log('🚀 模拟认证已启用');
      console.log('📝 可用测试账号:');
      console.log('   管理员: admin@example.com / admin123');
      console.log('   普通用户: user@example.com / user123');
      setupMockAuthInterceptor();
    }
  }, []);

  return (
    <RbacAuthProvider apiBaseUrl={apiBaseUrl}>
      {children}
    </RbacAuthProvider>
  );
}

