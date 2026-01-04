import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@shared/layouts/MainLayout';
import { DashboardOverview } from './pages/DashboardOverview';

/**
 * 仪表板功能模块
 * 包含数据概览、统计图表等
 */
export default function DashboardFeature() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<DashboardOverview />} />
      </Route>
    </Routes>
  );
}

