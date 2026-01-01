'use client';

import { useStateContext } from '../context/state-context';

export function useSidebar() {
  const context = useStateContext();
  
  return {
    sidebar: context.sidebar,
    toggleSidebar: context.toggleSidebar,
    setSidebarOpen: context.setSidebarOpen,
    setSidebarCollapsed: context.setSidebarCollapsed,
  };
}