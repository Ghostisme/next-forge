import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decodeToken, isTokenExpired } from '../utils/jwt';

/**
 * Next.js 中间件 - 路由级别的认证守卫
 * 在 middleware.ts 中使用
 */
export function createAuthMiddleware(config?: {
  publicPaths?: string[];
  loginPath?: string;
  unauthorizedPath?: string;
}) {
  const {
    publicPaths = ['/login', '/register', '/forgot-password'],
    loginPath = '/login',
    unauthorizedPath = '/unauthorized',
  } = config || {};

  return function authMiddleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 公开路径直接放行
    if (publicPaths.some((path) => pathname.startsWith(path))) {
      return NextResponse.next();
    }

    // 检查 Token
    const token = request.cookies.get('token')?.value;

    if (!token) {
      // 未登录，重定向到登录页
      const url = request.nextUrl.clone();
      url.pathname = loginPath;
      url.searchParams.set('returnUrl', pathname);
      return NextResponse.redirect(url);
    }

    // 检查 Token 是否过期
    if (isTokenExpired(token)) {
      const url = request.nextUrl.clone();
      url.pathname = loginPath;
      url.searchParams.set('returnUrl', pathname);
      url.searchParams.set('reason', 'expired');
      return NextResponse.redirect(url);
    }

    // Token 有效，解析用户信息
    const decoded = decodeToken(token);
    if (!decoded) {
      const url = request.nextUrl.clone();
      url.pathname = loginPath;
      return NextResponse.redirect(url);
    }

    // 可以在这里添加更多的权限检查逻辑
    // 例如：特定路径需要特定角色

    return NextResponse.next();
  };
}