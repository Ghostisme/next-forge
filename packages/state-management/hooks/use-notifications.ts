'use client';

import { useStateContext } from '../context/state-context';

export function useNotifications() {
  const context = useStateContext();
  
  return {
    notifications: context.notifications,
    addNotification: context.addNotification,
    markNotificationRead: context.markNotificationRead,
    clearNotification: context.clearNotification,
    clearAllNotifications: context.clearAllNotifications,
  };
}