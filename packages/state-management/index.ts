export { StateProvider, useStateContext } from './context/state-context';

export { useGlobalState } from './hooks/use-global-state';
export { useSidebar } from './hooks/use-sidebar';
export { useBreadcrumbs } from './hooks/use-breadcrumbs';
export { useTheme } from './hooks/use-theme';
export { useNotifications } from './hooks/use-notifications';
export { useLoading } from './hooks/use-loading';
export { useCurrentUser } from './hooks/use-current-user';

export { stateStorage } from './utils/storage';

export type {
  Theme,
  SidebarState,
  BreadcrumbItem,
  NotificationItem,
  LoadingState,
  UserPreferences,
  GlobalState,
} from './types';