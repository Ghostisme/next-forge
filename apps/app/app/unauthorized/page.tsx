'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@repo/rbac';

export default function UnauthorizedPage() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="text-6xl mb-4">🚫</div>
        <h2 className="text-2xl font-bold mb-4">无权访问</h2>
        <p className="text-gray-600 mb-6">
          抱歉，您当前的角色（{user?.role}）没有权限访问此页面。
        </p>
        <div className="space-y-2">
          <button
            onClick={() => router.back()}
            className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            返回上一页
          </button>
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            返回控制面板
          </button>
        </div>
      </div>
    </div>
  );
}