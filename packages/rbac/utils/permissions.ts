import type { Role, PermissionList } from '../types';
import { rolePermissions } from '../types';

/**
 * 权限检查工具类
 */
export class PermissionChecker {
  /**
   * 检查角色是否拥有指定权限
   */
  static hasPermission(
    role: Role,
    permission: PermissionList,
    customPermissions?: PermissionList[]
  ): boolean {
    // 如果有自定义权限，优先使用
    if (customPermissions && customPermissions.length > 0) {
      return customPermissions.includes(permission);
    }

    // 否则使用角色默认权限
    const permissions = rolePermissions[role] || [];
    return permissions.includes(permission);
  }

  /**
   * 检查是否拥有任一权限
   */
  static hasAnyPermission(
    role: Role,
    permissions: PermissionList[],
    customPermissions?: PermissionList[]
  ): boolean {
    return permissions.some((permission) =>
      this.hasPermission(role, permission, customPermissions)
    );
  }

  /**
   * 检查是否拥有所有权限
   */
  static hasAllPermissions(
    role: Role,
    permissions: PermissionList[],
    customPermissions?: PermissionList[]
  ): boolean {
    return permissions.every((permission) =>
      this.hasPermission(role, permission, customPermissions)
    );
  }

  /**
   * 获取角色的所有权限
   */
  static getRolePermissions(
    role: Role,
    customPermissions?: PermissionList[]
  ): PermissionList[] {
    if (customPermissions && customPermissions.length > 0) {
      return customPermissions;
    }
    return rolePermissions[role] || [];
  }

  /**
   * 检查资源级权限（支持通配符）
   * 例如：'user:*' 可以匹配 'user:read', 'user:create' 等
   */
  static hasResourcePermission(
    role: Role,
    resource: string,
    action?: string,
    customPermissions?: PermissionList[]
  ): boolean {
    const userPermissions = this.getRolePermissions(role, customPermissions);

    // 检查完整权限
    if (action) {
      const fullPermission = `${resource}:${action}` as PermissionList;
      if (userPermissions.includes(fullPermission)) {
        return true;
      }
    }

    // 检查通配符权限
    const wildcardPermission = `${resource}:*` as PermissionList;
    return userPermissions.includes(wildcardPermission);
  }
}