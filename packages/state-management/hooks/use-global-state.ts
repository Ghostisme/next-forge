'use client';

import { useStateContext } from '../context/state-context';
import type { GlobalState } from '../types';

export function useGlobalState(): GlobalState {
  const context = useStateContext();
  
  return {
    sidebar: context.sidebar,
    breadcrumbs: context.breadcrumbs,
    theme: context.theme,
    notifications: context.notifications,
    loading: context.loading,
    currentPath: context.currentPath,
    currentUser: context.currentUser,
    permissions: context.permissions,
    preferences: context.preferences,
  };
}