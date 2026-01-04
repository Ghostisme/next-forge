import { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@repo/rbac';
import type { Role } from '@repo/rbac';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: Role | Role[];
  permission?: string;
  redirectTo?: string;
  fallback?: React.ReactNode;
}

/**
 * Vite 兼容的路由守卫组件
 * 
 * 与 Next.js 版本的区别：
 * - 使用 react-router-dom 的 useNavigate 和 useLocation
 * - 不依赖 next/navigation
 * 
 * 用法：
 * <ProtectedRoute requiredRole="admin">
 *   <AdminPage />
 * </ProtectedRoute>
 */
export function ProtectedRoute({
  children,
  requiredRole,
  permission,
  redirectTo = '/auth/login',
  fallback = (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
    </div>
  ),
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoading) return;

    // 未登录，重定向到登录页
    if (!isAuthenticated || !user) {
      const returnUrl = encodeURIComponent(location.pathname + location.search);
      navigate(`${redirectTo}?returnUrl=${returnUrl}`, { replace: true });
      return;
    }

    // 检查角色权限
    if (requiredRole) {
      const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
      if (!roles.includes(user.role)) {
        navigate('/unauthorized', { replace: true });
        return;
      }
    }

    // 检查操作权限（简化版本，可根据需要扩展）
    if (permission && user.permissions) {
      const hasPermission = user.permissions.includes(permission);
      if (!hasPermission) {
        navigate('/unauthorized', { replace: true });
        return;
      }
    }
  }, [
    isAuthenticated,
    isLoading,
    user,
    requiredRole,
    permission,
    redirectTo,
    navigate,
    location,
  ]);

  // 加载中显示 fallback
  if (isLoading) {
    return <>{fallback}</>;
  }

  // 未认证，显示 fallback（即将重定向）
  if (!isAuthenticated || !user) {
    return <>{fallback}</>;
  }

  // 权限验证通过，渲染子组件
  return <>{children}</>;
}

