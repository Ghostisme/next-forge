'use client';

import { useStateContext } from '../context/state-context';

export function useCurrentUser() {
  const context = useStateContext();
  
  return {
    currentUser: context.currentUser,
    permissions: Array.from(context.permissions),
    setCurrentUser: context.setCurrentUser,
    updateUser: context.updateUser,
    clearUser: context.clearUser,
    hasPermission: context.hasPermission,
    hasAnyPermission: context.hasAnyPermission,
    hasAllPermissions: context.hasAllPermissions,
  };
}