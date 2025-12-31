import { BarChart } from '@repo/charts';
import { PermissionWrapper, useAuth } from '@repo/rbac';

export default function DashboardPage() {
  const { user, logout } = useAuth();

  const chartData = [
    { label: '一月', value: 30 },
    { label: '二月', value: 45 },
    { label: '三月', value: 60 },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Vite 管理后台</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {user?.name} ({user?.role})
            </span>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              退出
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">数据概览</h2>
          <BarChart data={chartData} />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">操作示例</h2>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              查看数据
            </button>

            <PermissionWrapper permission="content:create">
              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                创建内容
              </button>
            </PermissionWrapper>

            <PermissionWrapper permission="user:delete">
              <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                删除用户
              </button>
            </PermissionWrapper>
          </div>
        </div>
      </main>
    </div>
  );
}