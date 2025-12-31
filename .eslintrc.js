module.exports = {
  root: true,
  // 默认使用基础配置
  extends: ['@repo/eslint-config/base'],
  ignorePatterns: [
    'node_modules',
    'dist',
    'build',
    '.next',
    '.turbo',
    'storybook-static',
    '*.config.js',
    '*.config.ts',
    'coverage',
  ],
};