'use client';

import { useAuth } from '../context/auth-context';
import type { Role } from '../types';

interface RoleGateProps {
  children: React.ReactNode;
  allowedRoles: Role | Role[];
  fallback?: React.ReactNode;
}

/**
 * 角色门控组件
 * 用法：
 * <RoleGate allowedRoles={['admin', 'manager']}>
 *   <AdminContent />
 * </RoleGate>
 */
export function RoleGate({
  children,
  allowedRoles,
  fallback = null,
}: RoleGateProps) {
  const { user } = useAuth();

  if (!user) {
    return <>{fallback}</>;
  }

  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  if (!roles.includes(user.role)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}