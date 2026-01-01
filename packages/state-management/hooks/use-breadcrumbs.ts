'use client';

import { useStateContext } from '../context/state-context';

export function useBreadcrumbs() {
  const context = useStateContext();
  
  return {
    breadcrumbs: context.breadcrumbs,
    setBreadcrumbs: context.setBreadcrumbs,
    addBreadcrumb: context.addBreadcrumb,
    clearBreadcrumbs: context.clearBreadcrumbs,
  };
}