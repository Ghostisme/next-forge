import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@shared/layouts/MainLayout';
import { SettingsPage } from './pages/SettingsPage';

/**
 * 设置功能模块
 * 包含系统设置、个人设置等
 */
export default function SettingsFeature() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}

