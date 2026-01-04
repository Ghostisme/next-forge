import { Card } from '@repo/design-system/components/ui/card';
import { Button } from '@repo/design-system/components/ui/button';
import { Input } from '@repo/design-system/components/ui/input';
import { Switch } from '@repo/design-system/components/ui/switch';
import { useTheme } from '@repo/state-management';

/**
 * 设置页面
 */
export function SettingsPage() {
  const { theme, setTheme } = useTheme();
  
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold">系统设置</h1>
        <p className="text-muted-foreground mt-2">配置系统参数和个人偏好</p>
      </div>
      
      {/* 外观设置 */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">外观设置</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">深色模式</p>
              <p className="text-sm text-muted-foreground">切换深色/浅色主题</p>
            </div>
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
            />
          </div>
        </div>
      </Card>
      
      {/* 账户设置 */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">账户设置</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">用户名</label>
            <Input placeholder="请输入用户名" className="mt-1" />
          </div>
          
          <div>
            <label className="text-sm font-medium">邮箱</label>
            <Input type="email" placeholder="请输入邮箱" className="mt-1" />
          </div>
          
          <Button>保存更改</Button>
        </div>
      </Card>
      
      {/* 通知设置 */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">通知设置</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">邮件通知</p>
              <p className="text-sm text-muted-foreground">接收系统邮件通知</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">浏览器通知</p>
              <p className="text-sm text-muted-foreground">接收浏览器推送通知</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>
    </div>
  );
}

