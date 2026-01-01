'use client';

import { useStateContext } from '../context/state-context';

export function useLoading() {
  const context = useStateContext();
  
  return {
    loading: context.loading,
    showLoading: context.showLoading,
    hideLoading: context.hideLoading,
  };
}