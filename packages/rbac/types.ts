// 角色定义
export type Role = 'admin' | 'manager' | 'user' | 'guest';

// 资源定义
export type Resource = 
  | 'user'
  | 'content'
  | 'settings'
  | 'dashboard'
  | 'reports'
  | 'system';

// 操作定义
export type Action = 'create' | 'read' | 'update' | 'delete' | 'export' | 'import';

// 权限定义（资源:操作格式）
export type Permission = `${Resource}:${Action}`;

// 具体权限示例
export type PermissionList = 
  | 'user:read'
  | 'user:create'
  | 'user:update'
  | 'user:delete'
  | 'content:read'
  | 'content:create'
  | 'content:update'
  | 'content:delete'
  | 'settings:read'
  | 'settings:update'
  | 'dashboard:read'
  | 'reports:read'
  | 'reports:export'
  | 'system:read'
  | 'system:update';

// 角色权限映射
export const rolePermissions: Record<Role, PermissionList[]> = {
  admin: [
    'user:read', 'user:create', 'user:update', 'user:delete',
    'content:read', 'content:create', 'content:update', 'content:delete',
    'settings:read', 'settings:update',
    'dashboard:read',
    'reports:read', 'reports:export',
    'system:read', 'system:update',
  ],
  manager: [
    'user:read', 'user:update',
    'content:read', 'content:create', 'content:update', 'content:delete',
    'settings:read',
    'dashboard:read',
    'reports:read', 'reports:export',
  ],
  user: [
    'content:read', 'content:create', 'content:update',
    'dashboard:read',
    'reports:read',
  ],
  guest: [
    'content:read',
    'dashboard:read',
  ],
};

// JWT Token 数据结构
export interface TokenPayload {
  userId: string;
  email: string;
  role: Role;
  permissions?: PermissionList[];
  exp: number; // 过期时间戳
  iat: number; // 签发时间戳
}

// 用户信息
export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  permissions?: PermissionList[]; // 可以覆盖默认角色权限
}

// 认证状态
export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// 登录响应
export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}