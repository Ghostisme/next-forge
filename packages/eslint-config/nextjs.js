module.exports = {
  extends: [
    './react.js',
    'plugin:@next/next/recommended',
    'plugin:@next/next/core-web-vitals',
  ],
  env: {
    browser: true,
    node: true,
  },
  rules: {
    // Next.js 特定规则
    '@next/next/no-html-link-for-pages': 'off',
  },
};