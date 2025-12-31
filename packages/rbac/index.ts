// Context
export { AuthProvider, useAuth } from './context/auth-context';

// Components
export { ProtectedRoute } from './components/protected-route';
export { PermissionWrapper } from './components/permission-wrapper';
export { RoleGate } from './components/role-gate';

// Hooks
export { usePermission, useAnyPermission, useAllPermissions } from './hooks/use-permission';
export { useRole, useAnyRole, useIsAdmin, useIsManager } from './hooks/use-role';

// Utils
export { decodeToken, isTokenExpired, getTokenRemainingTime } from './utils/jwt';
export { tokenStorage } from './utils/storage';
export { PermissionChecker } from './utils/permissions';

// Middleware
export { createAuthMiddleware } from './middleware/auth-middleware';

// Types
export type {
  Role,
  Resource,
  Action,
  Permission,
  PermissionList,
  User,
  TokenPayload,
  AuthState,
  LoginResponse,
} from './types';
export { rolePermissions } from './types';