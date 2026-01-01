'use client';

import { useStateContext } from '../context/state-context';

export function useTheme() {
  const context = useStateContext();
  
  return {
    theme: context.theme,
    setTheme: context.setTheme,
  };
}