'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { create } from 'zustand';
import { persist, devtools, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { User } from '@repo/rbac';
import type { GlobalState, BreadcrumbItem, NotificationItem, Theme, UserPreferences } from '../types';

interface StateContextType extends GlobalState {
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setBreadcrumbs: (breadcrumbs: BreadcrumbItem[]) => void;
  addBreadcrumb: (item: BreadcrumbItem) => void;
  clearBreadcrumbs: () => void;
  setTheme: (theme: Theme) => void;
  addNotification: (notification: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  clearNotification: (id: string) => void;
  clearAllNotifications: () => void;
  showLoading: (tip?: string) => void;
  hideLoading: () => void;
  setCurrentPath: (path: string) => void;
  setCurrentUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => void;
  clearUser: () => void;
  hasPermission: (permission: string) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
  hasAllPermissions: (permissions: string[]) => boolean;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

interface StateProviderProps {
  children: ReactNode;
  enablePersist?: boolean;
  enableDevtools?: boolean;
}

const createStore = (enablePersist: boolean, enableDevtools: boolean) => {
  const initialState: GlobalState = {
    sidebar: { open: true, collapsed: false },
    breadcrumbs: [],
    theme: 'system',
    notifications: [],
    loading: { loading: false },
    currentPath: '/',
    currentUser: null,
    permissions: new Set(),
    preferences: {
      language: 'zh-CN',
      timezone: 'Asia/Shanghai',
      pageSize: 20,
      showWelcome: true,
    },
  };

  let storeCreator: any = (set: any, get: any) => ({
    ...initialState,

    toggleSidebar: () =>
      set((state: GlobalState) => ({
        sidebar: { ...state.sidebar, open: !state.sidebar.open },
      })),

    setSidebarOpen: (open: boolean) =>
      set((state: GlobalState) => ({
        sidebar: { ...state.sidebar, open },
      })),

    setSidebarCollapsed: (collapsed: boolean) =>
      set((state: GlobalState) => ({
        sidebar: { ...state.sidebar, collapsed },
      })),

    setBreadcrumbs: (breadcrumbs: BreadcrumbItem[]) =>
      set({ breadcrumbs }),

    addBreadcrumb: (item: BreadcrumbItem) =>
      set((state: GlobalState) => ({
        breadcrumbs: [...state.breadcrumbs, item],
      })),

    clearBreadcrumbs: () => set({ breadcrumbs: [] }),

    setTheme: (theme: Theme) => set({ theme }),

    addNotification: (notification: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) =>
      set((state: GlobalState) => ({
        notifications: [
          {
            ...notification,
            id: `notif-${Date.now()}-${Math.random()}`,
            timestamp: Date.now(),
            read: false,
          },
          ...state.notifications,
        ],
      })),

    markNotificationRead: (id: string) =>
      set((state: GlobalState) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, read: true } : n
        ),
      })),

    clearNotification: (id: string) =>
      set((state: GlobalState) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
      })),

    clearAllNotifications: () => set({ notifications: [] }),

    showLoading: (tip?: string) =>
      set({ loading: { loading: true, tip } }),

    hideLoading: () =>
      set({ loading: { loading: false } }),

    setCurrentPath: (path: string) => set({ currentPath: path }),

    setCurrentUser: (user: User | null) =>
      set({
        currentUser: user,
        permissions: new Set(user?.permissions || []),
      }),

    updateUser: (updates: Partial<User>) =>
      set((state: GlobalState) => ({
        currentUser: state.currentUser
          ? { ...state.currentUser, ...updates }
          : null,
      })),

    clearUser: () =>
      set({ currentUser: null, permissions: new Set() }),

    hasPermission: (permission: string): boolean => {
      const state = get() as GlobalState;
      return state.permissions.has(permission);
    },

    hasAnyPermission: (permissions: string[]): boolean => {
      const state = get() as GlobalState;
      return permissions.some((p) => state.permissions.has(p));
    },

    hasAllPermissions: (permissions: string[]): boolean => {
      const state = get() as GlobalState;
      return permissions.every((p) => state.permissions.has(p));
    },

    updatePreferences: (preferences: Partial<UserPreferences>) =>
      set((state: GlobalState) => ({
        preferences: { ...state.preferences, ...preferences },
      })),
  });

  storeCreator = immer(storeCreator);
  storeCreator = subscribeWithSelector(storeCreator);

  if (enableDevtools && process.env.NODE_ENV === 'development') {
    storeCreator = devtools(storeCreator, { name: 'next-forge-state' });
  }

  if (enablePersist) {
    storeCreator = persist(storeCreator, {
      name: 'next-forge:state:v1',
      partialize: (state: GlobalState) => ({
        sidebar: state.sidebar,
        theme: state.theme,
        preferences: state.preferences,
      }),
    });
  }

  return create(storeCreator);
};

let globalStore: any = null;

export function StateProvider({
  children,
  enablePersist = true,
  enableDevtools = true,
}: StateProviderProps) {
  if (!globalStore) {
    globalStore = createStore(enablePersist, enableDevtools);
  }

  const state = globalStore();

  return (
    <StateContext.Provider value={state}>
      {children}
    </StateContext.Provider>
  );
}

export function useStateContext() {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useStateContext must be used within a StateProvider');
  }
  return context;
}