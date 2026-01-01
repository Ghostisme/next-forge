import type { User } from '@repo/rbac';

export type Theme = 'light' | 'dark' | 'system';

export interface SidebarState {
  open: boolean;
  collapsed: boolean;
}

export interface BreadcrumbItem {
  label: string;
  path?: string;
  icon?: string;
}

export interface NotificationItem {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
}

export interface LoadingState {
  loading: boolean;
  tip?: string;
}

export interface UserPreferences {
  language: string;
  timezone: string;
  pageSize: number;
  showWelcome: boolean;
}

export interface GlobalState {
  sidebar: SidebarState;
  breadcrumbs: BreadcrumbItem[];
  theme: Theme;
  notifications: NotificationItem[];
  loading: LoadingState;
  currentPath: string;
  currentUser: User | null;
  permissions: Set<string>;
  preferences: UserPreferences;
}