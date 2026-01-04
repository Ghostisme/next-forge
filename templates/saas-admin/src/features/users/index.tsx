import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@shared/layouts/MainLayout';
import { UserListPage } from './pages/UserListPage';

/**
 * 用户管理功能模块
 * 包含用户列表、用户详情、用户编辑等功能
 */
export default function UsersFeature() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<UserListPage />} />
      </Route>
    </Routes>
  );
}

