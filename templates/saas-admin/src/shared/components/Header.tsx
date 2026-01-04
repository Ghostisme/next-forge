import { Button } from '@repo/design-system/components/ui/button';
import { useAuth } from '@repo/rbac';
import { Bell, User } from 'lucide-react';

/**
 * 头部组件
 */
export function Header() {
  const { user, logout } = useAuth();
  
  return (
    <header className="h-16 border-b flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold">
          {import.meta.env.VITE_APP_TITLE || 'SaaS 管理后台'}
        </h1>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* 通知 */}
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        
        {/* 用户菜单 */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          {user && (
            <span className="text-sm text-muted-foreground">{user.name}</span>
          )}
        </div>
        
        {/* 退出 */}
        <Button variant="outline" size="sm" onClick={logout}>
          退出登录
        </Button>
      </div>
    </header>
  );
}

