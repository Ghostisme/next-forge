import { Button } from '@repo/design-system/components/ui/button';
import { Input } from '@repo/design-system/components/ui/input';
import { Card } from '@repo/design-system/components/ui/card';
import { useAuth } from '@repo/rbac';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * 登录页面
 */
export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (error) {
      console.error('登录失败:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // 检查是否启用模拟认证
  const isMockAuth = import.meta.env.VITE_USE_MOCK_AUTH === 'true';
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">欢迎回来</h1>
          <p className="text-muted-foreground mt-2">登录到您的账户</p>
        </div>
        
        {isMockAuth && (
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
              🚀 开发模式 - 测试账号
            </p>
            <div className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
              <p>管理员: <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">admin@example.com</code> / <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">admin123</code></p>
              <p>普通用户: <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">user@example.com</code> / <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">user123</code></p>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">邮箱</label>
            <Input
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          
          <div>
            <label className="text-sm font-medium">密码</label>
            <Input
              type="password"
              placeholder="请输入密码"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? '登录中...' : '登录'}
          </Button>
        </form>
      </Card>
    </div>
  );
}

