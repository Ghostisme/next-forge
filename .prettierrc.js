module.exports = {
  // 代码格式化配置
  semi: true,                    // 使用分号
  singleQuote: true,             // 使用单引号
  trailingComma: 'es5',          // 尾随逗号
  tabWidth: 2,                   // 缩进宽度
  printWidth: 100,               // 每行最大字符数
  arrowParens: 'always',         // 箭头函数参数括号
  endOfLine: 'lf',               // 换行符
  bracketSpacing: true,          // 对象字面量空格
  jsxSingleQuote: false,         // JSX 使用双引号
  
  // 覆盖特定文件类型的配置
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 80,
      },
    },
    {
      files: ['*.md', '*.mdx'],
      options: {
        proseWrap: 'preserve',
      },
    },
  ],
};