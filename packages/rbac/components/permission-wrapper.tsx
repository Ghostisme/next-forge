'use client';

import React from 'react';
import { useAuth } from '../context/auth-context';
import type { PermissionList } from '../types';

interface PermissionWrapperProps {
  children: React.ReactNode;
  permission: PermissionList | PermissionList[];
  mode?: 'any' | 'all'; // 'any' 表示拥有任一权限即可，'all' 表示必须拥有所有权限
  fallback?: React.ReactNode;
  renderWithoutPermission?: boolean; // 是否渲染禁用状态的组件
}

/**
 * 按钮/操作级别的权限包装组件
 * 用法：
 * <PermissionWrapper permission="user:delete">
 *   <button>删除用户</button>
 * </PermissionWrapper>
 */
export function PermissionWrapper({
  children,
  permission,
  mode = 'any',
  fallback = null,
  renderWithoutPermission = false,
}: PermissionWrapperProps) {
  const { hasPermission, hasAnyPermission, hasAllPermissions } = useAuth();

  const permissions = Array.isArray(permission) ? permission : [permission];

  let hasAccess = false;

  if (permissions.length === 1) {
    hasAccess = hasPermission(permissions[0]);
  } else {
    hasAccess =
      mode === 'any'
        ? hasAnyPermission(permissions)
        : hasAllPermissions(permissions);
  }

  // 无权限且不渲染禁用状态
  if (!hasAccess && !renderWithoutPermission) {
    return <>{fallback}</>;
  }

  // 无权限但渲染禁用状态
  if (!hasAccess && renderWithoutPermission) {
    // 克隆子元素并添加 disabled 属性
    if (React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        disabled: true,
        style: { ...children.props.style, opacity: 0.5, cursor: 'not-allowed' },
      });
    }
    return <>{children}</>;
  }

  // 有权限，正常渲染
  return <>{children}</>;
}