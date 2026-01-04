import { ProtectedRoute } from '@shared/components/ProtectedRoute';
import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PageLoading } from '@shared/components/PageLoading';

/**
 * 懒加载功能模块
 * 每个 feature 都是独立的功能模块，包含自己的路由、组件、hooks 等
 */
const AuthFeature = lazy(() => import('@features/auth'));
const DashboardFeature = lazy(() => import('@features/dashboard'));
const UsersFeature = lazy(() => import('@features/users'));
const SettingsFeature = lazy(() => import('@features/settings'));

/**
 * 应用路由配置
 * 
 * 架构说明：
 * - 公开路由：不需要认证即可访问（如登录页）
 * - 受保护路由：需要认证才能访问，使用 ProtectedRoute 包裹
 * - 权限路由：需要特定权限才能访问，通过 permission 属性控制
 * 
 * Feature-First 路由结构：
 * - 每个 feature 管理自己的子路由
 * - 使用通配符 /* 允许 feature 内部路由
 */
export function AppRouter() {
  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        {/* 公开路由 - 认证模块 */}
        <Route path="/auth/*" element={<AuthFeature />} />
        
        {/* 受保护的路由 - 仪表板 */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <DashboardFeature />
            </ProtectedRoute>
          }
        />
        
        {/* 受保护的路由 - 用户管理（需要权限） */}
        <Route
          path="/users/*"
          element={
            <ProtectedRoute permission="users:read">
              <UsersFeature />
            </ProtectedRoute>
          }
        />
        
        {/* 受保护的路由 - 系统设置（需要管理员权限） */}
        <Route
          path="/settings/*"
          element={
            <ProtectedRoute permission="settings:manage">
              <SettingsFeature />
            </ProtectedRoute>
          }
        />
        
        {/* 默认路由 */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {/* 404 路由 */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
}

