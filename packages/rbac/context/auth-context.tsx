'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import type { User, AuthState, LoginResponse, PermissionList } from '../types';
import { tokenStorage } from '../utils/storage';
import { decodeToken, isTokenExpired } from '../utils/jwt';
import { PermissionChecker } from '../utils/permissions';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
  hasPermission: (permission: PermissionList) => boolean;
  hasAnyPermission: (permissions: PermissionList[]) => boolean;
  hasAllPermissions: (permissions: PermissionList[]) => boolean;
  updateUser: (user: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
  apiBaseUrl?: string; // API 基础 URL
}

export function AuthProvider({ 
  children, 
  apiBaseUrl = '/api' 
}: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: true,
  });

  /**
   * 从 Token 初始化用户状态
   */
  const initializeAuth = useCallback(() => {
    const token = tokenStorage.getToken();
    const refreshToken = tokenStorage.getRefreshToken();

    if (!token) {
      setState((prev) => ({ ...prev, isLoading: false }));
      return;
    }

    // 检查 Token 是否过期
    if (isTokenExpired(token)) {
      // 尝试使用 refresh token 刷新
      if (refreshToken) {
        refreshAuth();
      } else {
        tokenStorage.clearTokens();
        setState((prev) => ({ ...prev, isLoading: false }));
      }
      return;
    }

    // 解析 Token 获取用户信息
    const decoded = decodeToken(token);
    if (decoded) {
      const user: User = {
        id: decoded.userId,
        email: decoded.email,
        role: decoded.role,
        name: decoded.email.split('@')[0], // 临时使用邮箱前缀作为名称
        permissions: decoded.permissions,
      };

      setState({
        user,
        token,
        refreshToken,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      tokenStorage.clearTokens();
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  /**
   * 登录
   */
  const login = useCallback(
    async (email: string, password: string) => {
      try {
        setState((prev) => ({ ...prev, isLoading: true }));

        // 调用后端登录 API
        const response = await fetch(`${apiBaseUrl}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          throw new Error('登录失败');
        }

        const data: LoginResponse = await response.json();

        // 保存 Token
        tokenStorage.setToken(data.token);
        tokenStorage.setRefreshToken(data.refreshToken);

        // 更新状态
        setState({
          user: data.user,
          token: data.token,
          refreshToken: data.refreshToken,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        setState((prev) => ({ ...prev, isLoading: false }));
        throw error;
      }
    },
    [apiBaseUrl]
  );

  /**
   * 登出
   */
  const logout = useCallback(async () => {
    try {
      // 调用后端登出 API（可选）
      await fetch(`${apiBaseUrl}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.token}`,
        },
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // 清除本地状态
      tokenStorage.clearTokens();
      setState({
        user: null,
        token: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, [apiBaseUrl, state.token]);

  /**
   * 刷新认证状态
   */
  const refreshAuth = useCallback(async () => {
    try {
      const refreshToken = tokenStorage.getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token');
      }

      // 调用后端刷新 API
      const response = await fetch(`${apiBaseUrl}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const data: LoginResponse = await response.json();

      // 更新 Token
      tokenStorage.setToken(data.token);
      tokenStorage.setRefreshToken(data.refreshToken);

      // 更新状态
      setState({
        user: data.user,
        token: data.token,
        refreshToken: data.refreshToken,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error('Auth refresh error:', error);
      // 刷新失败，清除状态
      tokenStorage.clearTokens();
      setState({
        user: null,
        token: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, [apiBaseUrl]);

  /**
   * 权限检查方法
   */
  const hasPermission = useCallback(
    (permission: PermissionList): boolean => {
      if (!state.user) return false;
      return PermissionChecker.hasPermission(
        state.user.role,
        permission,
        state.user.permissions
      );
    },
    [state.user]
  );

  const hasAnyPermission = useCallback(
    (permissions: PermissionList[]): boolean => {
      if (!state.user) return false;
      return PermissionChecker.hasAnyPermission(
        state.user.role,
        permissions,
        state.user.permissions
      );
    },
    [state.user]
  );

  const hasAllPermissions = useCallback(
    (permissions: PermissionList[]): boolean => {
      if (!state.user) return false;
      return PermissionChecker.hasAllPermissions(
        state.user.role,
        permissions,
        state.user.permissions
      );
    },
    [state.user]
  );

  /**
   * 更新用户信息
   */
  const updateUser = useCallback((updates: Partial<User>) => {
    setState((prev) => ({
      ...prev,
      user: prev.user ? { ...prev.user, ...updates } : null,
    }));
  }, []);

  // 初始化认证状态
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // 自动刷新 Token
  useEffect(() => {
    if (!state.token || !state.isAuthenticated) return;

    const checkAndRefresh = () => {
      if (state.token && isTokenExpired(state.token)) {
        refreshAuth();
      }
    };

    // 每分钟检查一次
    const interval = setInterval(checkAndRefresh, 60 * 1000);

    return () => clearInterval(interval);
  }, [state.token, state.isAuthenticated, refreshAuth]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        refreshAuth,
        hasPermission,
        hasAnyPermission,
        hasAllPermissions,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}