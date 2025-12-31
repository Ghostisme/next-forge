import { useNavigate } from 'react-router-dom';

export default function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <div className="text-6xl mb-4">🚫</div>
        <h2 className="text-2xl font-bold mb-4">无权访问</h2>
        <p className="text-gray-600 mb-6">抱歉，您没有权限访问此页面</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          返回首页
        </button>
      </div>
    </div>
  );
}