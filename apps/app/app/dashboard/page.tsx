'use client';

import {
  ProtectedRoute,
  PermissionWrapper,
  RoleGate,
  useAuth,
  usePermission
} from '@repo/rbac';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const canEditUser = usePermission('user:update');
  const canDeleteUser = usePermission('user:delete');

  const handleLogout = async () => {
    await logout();
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        {/* 头部 */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">控制面板</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {user?.name} ({user?.role})
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                退出登录
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          {/* 用户信息卡片 */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">用户信息</h2>
            <div className="space-y-2">
              <p><strong>ID:</strong> {user?.id}</p>
              <p><strong>姓名:</strong> {user?.name}</p>
              <p><strong>邮箱:</strong> {user?.email}</p>
              <p><strong>角色:</strong> {user?.role}</p>
            </div>
          </div>

          {/* 按钮级别权限控制示例 */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">用户操作（按钮级别权限）</h2>
            <div className="flex gap-4">
              {/* 所有人都能看到的按钮 */}
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                查看用户
              </button>

              {/* 只有拥有 user:update 权限的才能看到 */}
              <PermissionWrapper permission="user:update">
                <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                  编辑用户
                </button>
              </PermissionWrapper>

              {/* 只有拥有 user:delete 权限的才能看到 */}
              <PermissionWrapper permission="user:delete">
                <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                  删除用户
                </button>
              </PermissionWrapper>

              {/* 没有权限时渲染禁用状态 */}
              <PermissionWrapper
                permission="user:delete"
                renderWithoutPermission={true}
              >
                <button className="px-4 py-2 bg-gray-600 text-white rounded-md">
                  {canDeleteUser ? '永久删除' : '永久删除（无权限）'}
                </button>
              </PermissionWrapper>
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded text-sm">
              <p className="font-semibold">权限状态：</p>
              <p>编辑权限: {canEditUser ? '✅ 有' : '❌ 无'}</p>
              <p>删除权限: {canDeleteUser ? '✅ 有' : '❌ 无'}</p>
            </div>
          </div>

          {/* 角色门控示例 */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">角色专属内容</h2>

            <RoleGate allowedRoles="admin">
              <div className="p-4 bg-purple-50 border border-purple-200 rounded mb-4">
                <h3 className="font-semibold text-purple-800">管理员专区</h3>
                <p className="text-sm text-purple-600">只有管理员能看到这个区域</p>
              </div>
            </RoleGate>

            <RoleGate allowedRoles={['admin', 'manager']}>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded mb-4">
                <h3 className="font-semibold text-blue-800">管理层专区</h3>
                <p className="text-sm text-blue-600">管理员和经理都能看到这个区域</p>
              </div>
            </RoleGate>

            <div className="p-4 bg-green-50 border border-green-200 rounded">
              <h3 className="font-semibold text-green-800">公共区域</h3>
              <p className="text-sm text-green-600">所有登录用户都能看到这个区域</p>
            </div>
          </div>

          {/* 权限列表 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">我的权限列表</h2>
            <div className="grid grid-cols-2 gap-2">
              {user?.permissions?.map((permission) => (
                <div
                  key={permission}
                  className="px-3 py-2 bg-gray-100 rounded text-sm"
                >
                  {permission}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}