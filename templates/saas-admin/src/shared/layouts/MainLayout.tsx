import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';

/**
 * 主布局组件
 * 包含头部和内容区域
 */
export function MainLayout() {
  return (
    <div className="flex h-screen flex-col">
      {/* 头部 */}
      <Header />
      
      {/* 内容区域 */}
      <main className="flex-1 overflow-auto p-6 bg-background">
        <Outlet />
      </main>
    </div>
  );
}

