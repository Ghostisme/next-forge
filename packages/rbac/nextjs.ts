// Next.js 特定导出
export { createAuthMiddleware } from './middleware/auth-middleware';

// 重新导出通用功能，方便 Next.js 项目一次性导入
export * from './index';