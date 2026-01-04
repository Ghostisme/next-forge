import { Card } from '@repo/design-system/components/ui/card';
import { Button } from '@repo/design-system/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@repo/design-system/components/ui/table';
import { Plus, Search } from 'lucide-react';

/**
 * 用户列表页面
 */
export function UserListPage() {
  // 模拟用户数据
  const users = [
    { id: 1, name: '张三', email: 'zhangsan@example.com', role: '管理员', status: '活跃' },
    { id: 2, name: '李四', email: 'lisi@example.com', role: '用户', status: '活跃' },
    { id: 3, name: '王五', email: 'wangwu@example.com', role: '用户', status: '禁用' },
  ];
  
  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">用户管理</h1>
          <p className="text-muted-foreground mt-2">管理系统用户和权限</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          添加用户
        </Button>
      </div>
      
      {/* 搜索和筛选 */}
      <Card className="p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="搜索用户..."
              className="w-full pl-10 pr-4 py-2 border rounded-md"
            />
          </div>
          <Button variant="outline">筛选</Button>
        </div>
      </Card>
      
      {/* 用户表格 */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>姓名</TableHead>
              <TableHead>邮箱</TableHead>
              <TableHead>角色</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      user.status === '活跃'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {user.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      编辑
                    </Button>
                    <Button size="sm" variant="outline">
                      删除
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

