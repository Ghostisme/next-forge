'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../context/auth-context';
import type { Role, PermissionList } from '../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: Role | Role[];
  requiredPermission?: PermissionList | PermissionList[];
  redirectTo?: string;
  fallback?: React.ReactNode;
}

/**
 * 路由守卫组件
 * 用法：
 * <ProtectedRoute requiredRole="admin">
 *   <AdminPage />
 * </ProtectedRoute>
 */
export function ProtectedRoute({
  children,
  requiredRole,
  requiredPermission,
  redirectTo = '/login',
  fallback = <div>Loading...</div>,
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;

    // 未登录，重定向到登录页
    if (!isAuthenticated || !user) {
      // 保存当前路径，登录后可以跳回
      const returnUrl = encodeURIComponent(pathname || '/');
      router.push(`${redirectTo}?returnUrl=${returnUrl}`);
      return;
    }

    // 检查角色权限
    if (requiredRole) {
      const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
      if (!roles.includes(user.role)) {
        router.push('/unauthorized');
        return;
      }
    }

    // 检查操作权限
    if (requiredPermission) {
      const { hasPermission, hasAnyPermission } = useAuth();
      const permissions = Array.isArray(requiredPermission)
        ? requiredPermission
        : [requiredPermission];

      const hasAccess =
        permissions.length === 1
          ? hasPermission(permissions[0])
          : hasAnyPermission(permissions);

      if (!hasAccess) {
        router.push('/unauthorized');
        return;
      }
    }
  }, [
    isAuthenticated,
    isLoading,
    user,
    requiredRole,
    requiredPermission,
    redirectTo,
    router,
    pathname,
  ]);

  // 加载中显示 fallback
  if (isLoading) {
    return <>{fallback}</>;
  }

  // 未认证或权限不足，不渲染内容
  if (!isAuthenticated || !user) {
    return null;
  }

  // 权限验证通过，渲染子组件
  return <>{children}</>;
}