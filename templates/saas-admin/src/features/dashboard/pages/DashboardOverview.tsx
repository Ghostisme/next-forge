import { Card } from '@repo/design-system/components/ui/card';
import { Button } from '@repo/design-system/components/ui/button';
import { BarChart, LineChart } from '@repo/charts';
import { useCurrentUser } from '@repo/state-management';
import { BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react';

/**
 * 仪表板概览页面
 * 展示关键指标和统计数据
 */
export function DashboardOverview() {
  const currentUser = useCurrentUser();
  
  // 模拟数据
  const stats = [
    {
      title: '总用户数',
      value: '12,345',
      change: '+12.5%',
      icon: Users,
      color: 'text-blue-500',
    },
    {
      title: '总收入',
      value: '¥89,342',
      change: '+8.2%',
      icon: DollarSign,
      color: 'text-green-500',
    },
    {
      title: '增长率',
      value: '23.5%',
      change: '+3.1%',
      icon: TrendingUp,
      color: 'text-purple-500',
    },
    {
      title: '活跃率',
      value: '78.2%',
      change: '+5.4%',
      icon: BarChart3,
      color: 'text-orange-500',
    },
  ];
  
  return (
    <div className="space-y-6">
      {/* 欢迎信息 */}
      <div>
        <h1 className="text-3xl font-bold">欢迎回来, {currentUser?.name || '用户'}</h1>
        <p className="text-muted-foreground mt-2">
          这是您的仪表板概览，查看最新的业务数据
        </p>
      </div>
      
      {/* 统计卡片 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
                  <p className="text-sm text-green-500 mt-1">{stat.change}</p>
                </div>
                <div className={`${stat.color}`}>
                  <Icon className="h-8 w-8" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      
      {/* 图表区域 */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">用户增长趋势</h3>
          <div className="h-[300px]">
            <LineChart
              data={[
                { name: '1月', value: 400 },
                { name: '2月', value: 600 },
                { name: '3月', value: 800 },
                { name: '4月', value: 1200 },
                { name: '5月', value: 1600 },
                { name: '6月', value: 2000 },
              ]}
            />
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">收入统计</h3>
          <div className="h-[300px]">
            <BarChart
              data={[
                { name: '产品A', value: 4000 },
                { name: '产品B', value: 3000 },
                { name: '产品C', value: 2000 },
                { name: '产品D', value: 2780 },
                { name: '产品E', value: 1890 },
              ]}
            />
          </div>
        </Card>
      </div>
      
      {/* 快速操作 */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">快速操作</h3>
        <div className="flex gap-4">
          <Button>创建用户</Button>
          <Button variant="outline">查看报表</Button>
          <Button variant="outline">系统设置</Button>
        </div>
      </Card>
    </div>
  );
}

