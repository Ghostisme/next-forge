# 📦 组件导入指南

## 重要说明

`@repo/design-system` 包采用**按需导入**的方式，所有 UI 组件需要从具体路径导入。

## ✅ 正确的导入方式

### UI 组件

```typescript
// ✅ 正确 - 从具体路径导入
import { Button } from '@repo/design-system/components/ui/button';
import { Card } from '@repo/design-system/components/ui/card';
import { Input } from '@repo/design-system/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@repo/design-system/components/ui/table';

// ❌ 错误 - 不要从主入口导入
import { Button, Card } from '@repo/design-system';
```

### Provider 组件

```typescript
// ✅ 正确 - ThemeProvider 从 providers 导入
import { ThemeProvider } from '@repo/design-system/providers/theme';

// ✅ 正确 - DesignSystemProvider 从主入口导入（仅此一个）
import { DesignSystemProvider } from '@repo/design-system';
```

## 📋 常用组件导入路径

### 基础组件

```typescript
// 按钮
import { Button } from '@repo/design-system/components/ui/button';

// 输入框
import { Input } from '@repo/design-system/components/ui/input';

// 文本域
import { Textarea } from '@repo/design-system/components/ui/textarea';

// 标签
import { Label } from '@repo/design-system/components/ui/label';
```

### 布局组件

```typescript
// 卡片
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@repo/design-system/components/ui/card';

// 分隔符
import { Separator } from '@repo/design-system/components/ui/separator';

// 滚动区域
import { ScrollArea } from '@repo/design-system/components/ui/scroll-area';
```

### 表单组件

```typescript
// 表单
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@repo/design-system/components/ui/form';

// 选择框
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@repo/design-system/components/ui/select';

// 复选框
import { Checkbox } from '@repo/design-system/components/ui/checkbox';

// 开关
import { Switch } from '@repo/design-system/components/ui/switch';

// 单选框
import { RadioGroup, RadioGroupItem } from '@repo/design-system/components/ui/radio-group';
```

### 反馈组件

```typescript
// 对话框
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@repo/design-system/components/ui/dialog';

// 警告框
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from '@repo/design-system/components/ui/alert-dialog';

// 提示信息
import { Alert, AlertDescription, AlertTitle } from '@repo/design-system/components/ui/alert';

// Toast 通知
import { toast } from '@repo/design-system/components/ui/sonner';
```

### 数据展示

```typescript
// 表格
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@repo/design-system/components/ui/table';

// 徽章
import { Badge } from '@repo/design-system/components/ui/badge';

// 头像
import { Avatar, AvatarFallback, AvatarImage } from '@repo/design-system/components/ui/avatar';

// 骨架屏
import { Skeleton } from '@repo/design-system/components/ui/skeleton';
```

### 导航组件

```typescript
// 标签页
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/design-system/components/ui/tabs';

// 面包屑
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from '@repo/design-system/components/ui/breadcrumb';

// 下拉菜单
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@repo/design-system/components/ui/dropdown-menu';
```

## 🔧 工具函数

```typescript
// 样式合并工具
import { cn } from '@repo/design-system/lib/utils';

// 使用
<div className={cn('base-class', someCondition && 'conditional-class')} />
```

## 🎨 主题和样式

```typescript
// ThemeProvider - 主题管理
import { ThemeProvider } from '@repo/design-system/providers/theme';

// 在 App.tsx 中使用
<ThemeProvider defaultTheme="light" storageKey="app-theme">
  {children}
</ThemeProvider>

// 主题切换钩子
import { useTheme } from '@repo/design-system/providers/theme';

function MyComponent() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      切换主题
    </button>
  );
}
```

## 📚 其他基建包

### 认证和权限 (@repo/rbac)

```typescript
import { AuthProvider, useAuth, ProtectedRoute } from '@repo/rbac';
import { usePermission, useRole } from '@repo/rbac';
```

### 状态管理 (@repo/state-management)

```typescript
import { 
  StateProvider, 
  useGlobalState, 
  useSidebar, 
  useTheme, 
  useBreadcrumbs 
} from '@repo/state-management';
```

### HTTP 请求 (@repo/request)

```typescript
import { apiClient } from '@repo/request';
```

### 图表 (@repo/charts)

```typescript
import { LineChart, BarChart, PieChart } from '@repo/charts';
```

### 国际化 (@repo/internationalization)

```typescript
import { useTranslation } from '@repo/internationalization';
```

### 通知 (@repo/notifications)

⚠️ **注意**：`@repo/notifications` 依赖 Knock 服务，需要额外配置。

如需使用通知功能：

1. 在 `package.json` 中添加依赖：
```json
{
  "dependencies": {
    "@repo/notifications": "workspace:*"
  }
}
```

2. 配置环境变量：
```env
VITE_KNOCK_API_KEY=your_knock_api_key
VITE_KNOCK_FEED_CHANNEL_ID=your_feed_channel_id
```

3. 在 App.tsx 中添加 Provider：
```typescript
import { NotificationsProvider } from '@repo/notifications/components/provider';
import { useAuth } from '@repo/rbac';

function App() {
  const { user } = useAuth();
  
  return (
    <NotificationsProvider userId={user?.id || ''} theme="light">
      {children}
    </NotificationsProvider>
  );
}
```

4. 使用通知触发器：
```typescript
import { NotificationsTrigger } from '@repo/notifications/components/trigger';

function Header() {
  return (
    <div>
      <NotificationsTrigger />
    </div>
  );
}
```

**对于简单的通知需求，推荐使用 Sonner Toast：**

```typescript
import { toast } from '@repo/design-system/components/ui/sonner';

function MyComponent() {
  const handleClick = () => {
    toast.success('操作成功！');
    toast.error('操作失败！');
    toast.info('提示信息');
  };
  
  return <button onClick={handleClick}>显示通知</button>;
}
```

## 💡 最佳实践

### 1. 按需导入

```typescript
// ✅ 好 - 只导入需要的组件
import { Button } from '@repo/design-system/components/ui/button';
import { Card, CardContent } from '@repo/design-system/components/ui/card';

// ❌ 不好 - 导入未使用的组件
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@repo/design-system/components/ui/card';
// 但只使用了 Card 和 CardContent
```

### 2. 组合导入

```typescript
// ✅ 好 - 相关组件一起导入
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@repo/design-system/components/ui/dialog';
```

### 3. 使用别名

```typescript
// 如果组件名冲突，使用别名
import { Button as DesignButton } from '@repo/design-system/components/ui/button';
import { Button as CustomButton } from './CustomButton';
```

## 🐛 常见错误

### 错误 1：从主入口导入 UI 组件

```typescript
// ❌ 错误
import { Button } from '@repo/design-system';

// ✅ 正确
import { Button } from '@repo/design-system/components/ui/button';
```

### 错误 2：导入不存在的组件

```typescript
// ❌ 错误 - Spinner 需要单独处理
import { Spinner } from '@repo/design-system';

// ✅ 正确 - 使用自定义 loading 组件或从具体路径导入
<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
```

### 错误 3：混淆 Provider

```typescript
// ❌ 错误
import { ThemeProvider } from '@repo/design-system';

// ✅ 正确
import { ThemeProvider } from '@repo/design-system/providers/theme';

// 或者使用完整的 DesignSystemProvider
import { DesignSystemProvider } from '@repo/design-system';
```

## 📖 参考资源

- [Shadcn/ui 文档](https://ui.shadcn.com/)
- [Radix UI 文档](https://www.radix-ui.com/)
- [Tailwind CSS 文档](https://tailwindcss.com/)

## 🎯 总结

记住这个简单的规则：

1. **UI 组件** → 从 `@repo/design-system/components/ui/[component-name]` 导入
2. **ThemeProvider** → 从 `@repo/design-system/providers/theme` 导入
3. **工具函数** → 从 `@repo/design-system/lib/utils` 导入
4. **其他基建包** → 直接从包名导入，如 `@repo/rbac`

这样可以确保最优的代码分割和加载性能！ 🚀

