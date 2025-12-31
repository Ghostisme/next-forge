import { useEffect, useRef } from 'react';

export function useChart<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    // 清理函数
    return () => {
      if (ref.current) {
        // 清理 D3 创建的元素
        const svg = ref.current.querySelector('svg');
        if (svg) {
          svg.remove();
        }
      }
    };
  }, []);

  return ref;
}