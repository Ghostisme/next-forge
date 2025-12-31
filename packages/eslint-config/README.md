# @repo/eslint-config

共享的 ESLint 配置

## 使用方法

### 基础配置 (TypeScript)

// .eslintrc.js
module.exports = {
  extends: ['@repo/eslint-config/base'],
};### React 配置

// .eslintrc.js
module.exports = {
  extends: ['@repo/eslint-config/react'],
};### Next.js 配置

// .eslintrc.js
module.exports = {
  extends: ['@repo/eslint-config/nextjs'],
};