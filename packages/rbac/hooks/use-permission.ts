'use client';

import { useAuth } from '../context/auth-context';
import type { PermissionList } from '../types';

/**
 * 权限检查 Hook
 */
export function usePermission(permission: PermissionList): boolean {
  const { hasPermission } = useAuth();
  return hasPermission(permission);
}

/**
 * 多权限检查 Hook（任一）
 */
export function useAnyPermission(permissions: PermissionList[]): boolean {
  const { hasAnyPermission } = useAuth();
  return hasAnyPermission(permissions);
}

/**
 * 多权限检查 Hook（全部）
 */
export function useAllPermissions(permissions: PermissionList[]): boolean {
  const { hasAllPermissions } = useAuth();
  return hasAllPermissions(permissions);
}