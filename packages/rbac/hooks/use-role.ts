'use client';

import { useAuth } from '../context/auth-context';
import type { Role } from '../types';

/**
 * 角色检查 Hook
 */
export function useRole(role: Role): boolean {
  const { user } = useAuth();
  return user?.role === role;
}

/**
 * 多角色检查 Hook
 */
export function useAnyRole(roles: Role[]): boolean {
  const { user } = useAuth();
  return user ? roles.includes(user.role) : false;
}

/**
 * 检查是否为管理员
 */
export function useIsAdmin(): boolean {
  return useRole('admin');
}

/**
 * 检查是否为管理员或经理
 */
export function useIsManager(): boolean {
  return useAnyRole(['admin', 'manager']);
}