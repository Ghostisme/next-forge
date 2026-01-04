import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';

/**
 * 认证功能模块
 * 包含登录、注册等认证相关功能
 */
export default function AuthFeature() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  );
}

