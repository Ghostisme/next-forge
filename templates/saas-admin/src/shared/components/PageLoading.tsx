/**
 * 页面加载组件
 * 用于路由懒加载时的 loading 状态
 */
export function PageLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="w-8 h-8 mx-auto mb-4 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">加载中...</p>
      </div>
    </div>
  );
}

