import { StateProvider } from '@repo/state-management';
import { ThemeProvider } from '@repo/design-system/providers/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from '@core/router';
import { MockAuthWrapper } from '@core/providers/MockAuthWrapper';

// 创建 React Query 客户端
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 分钟
    },
  },
});

/**
 * 应用主组件
 * 
 * 提供者层级结构：
 * 1. QueryClientProvider - 服务端状态管理
 * 2. ThemeProvider - 主题管理
 * 3. StateProvider - 全局状态管理
 * 4. AuthProvider - 认证和权限
 * 5. BrowserRouter - 路由
 * 
 * 注意：
 * - NotificationProvider 依赖 Knock 服务，需要单独配置
 * - 如需使用通知功能，请参考 IMPORT_GUIDE.md
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="saas-admin-theme">
        <StateProvider>
          <MockAuthWrapper apiBaseUrl={import.meta.env.VITE_API_BASE_URL || '/api'}>
            <BrowserRouter>
              <AppRouter />
            </BrowserRouter>
          </MockAuthWrapper>
        </StateProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

