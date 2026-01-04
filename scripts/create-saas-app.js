#!/usr/bin/env node

/**
 * SaaS 应用快速构建脚手架
 * 用法: pnpm create-saas-app my-app
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ANSI 颜色
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(step, message) {
  log(`\n[${step}/5] ${message}`, 'cyan');
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  console.error(`❌ ${colors.red}${message}${colors.reset}`);
}

function copyDirectory(src, dest, replacements = {}) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    // 跳过不需要复制的文件
    if (
      entry.name === 'node_modules' ||
      entry.name === 'dist' ||
      entry.name === '.turbo' ||
      entry.name === '.next'
    ) {
      continue;
    }

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath, replacements);
    } else {
      let content = fs.readFileSync(srcPath, 'utf8');

      // 替换占位符
      for (const [key, value] of Object.entries(replacements)) {
        content = content.replace(new RegExp(key, 'g'), value);
      }

      fs.writeFileSync(destPath, content, 'utf8');
    }
  }
}

function updatePackageJson(appPath, appName) {
  const packageJsonPath = path.join(appPath, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  packageJson.name = `@apps/${appName}`;
  packageJson.version = '1.0.0';

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
}

function createEnvFile(appPath, appName) {
  const envContent = `# 开发环境配置

# API 基础地址
VITE_API_BASE_URL=http://localhost:3001

# 是否启用模拟认证（开发时可以不依赖后端）
VITE_USE_MOCK_AUTH=true

# 应用标题
VITE_APP_TITLE=${appName} 管理后台

# 应用环境
VITE_APP_ENV=development
`;

  fs.writeFileSync(path.join(appPath, '.env.development'), envContent, 'utf8');
}

function main() {
  const args = process.argv.slice(2);
  const appName = args[0];

  if (!appName) {
    logError('请提供应用名称！');
    log('\n用法: pnpm create-saas-app <app-name>', 'yellow');
    log('示例: pnpm create-saas-app my-admin\n', 'yellow');
    process.exit(1);
  }

  // 验证应用名称
  if (!/^[a-z0-9-]+$/.test(appName)) {
    logError('应用名称只能包含小写字母、数字和连字符！');
    process.exit(1);
  }

  log('\n🚀 开始创建 SaaS 应用...\n', 'bright');
  log(`📦 应用名称: ${appName}`, 'blue');

  const rootDir = process.cwd();
  const templateDir = path.join(rootDir, 'templates', 'saas-admin');
  const appsDir = path.join(rootDir, 'apps');
  const appPath = path.join(appsDir, appName);

  // 检查模板是否存在
  if (!fs.existsSync(templateDir)) {
    logError('找不到 saas-admin 模板！');
    logError(`预期路径: ${templateDir}`);
    process.exit(1);
  }

  // 检查应用是否已存在
  if (fs.existsSync(appPath)) {
    logError(`应用 "${appName}" 已存在！`);
    logError(`路径: ${appPath}`);
    process.exit(1);
  }

  try {
    // 步骤 1: 复制模板文件
    logStep(1, '复制模板文件...');
    const replacements = {
      '@templates/saas-admin': `@apps/${appName}`,
      'saas-admin': appName,
      'SaaS 管理后台': `${appName} 管理后台`,
    };
    copyDirectory(templateDir, appPath, replacements);
    logSuccess('模板文件复制完成');

    // 步骤 2: 更新 package.json
    logStep(2, '配置项目信息...');
    updatePackageJson(appPath, appName);
    logSuccess('项目配置完成');

    // 步骤 3: 创建环境变量文件
    logStep(3, '创建环境配置...');
    createEnvFile(appPath, appName);
    logSuccess('环境配置创建完成');

    // 步骤 4: 安装依赖
    logStep(4, '安装依赖（这可能需要几分钟）...');
    try {
      execSync('pnpm install', {
        cwd: rootDir,
        stdio: 'inherit',
      });
      logSuccess('依赖安装完成');
    } catch (error) {
      logError('依赖安装失败，但项目已创建。请手动运行 pnpm install');
    }

    // 步骤 5: 完成
    logStep(5, '完成！');

    log('\n🎉 应用创建成功！\n', 'green');
    log('📁 项目路径:', 'cyan');
    log(`   ${appPath}\n`);

    log('🚀 快速开始:', 'cyan');
    log(`   cd apps/${appName}`, 'yellow');
    log(`   pnpm dev\n`, 'yellow');

    log('🔑 测试账号:', 'cyan');
    log('   管理员: admin@example.com / admin123', 'yellow');
    log('   普通用户: user@example.com / user123\n', 'yellow');

    log('📚 文档:', 'cyan');
    log(`   - apps/${appName}/QUICK_START.md - 快速开始`, 'yellow');
    log(`   - apps/${appName}/LOGIN_TEST_GUIDE.md - 登录测试`, 'yellow');
    log(`   - apps/${appName}/USAGE.md - 使用文档\n`, 'yellow');

    log('💡 提示:', 'cyan');
    log('   • 模拟认证已启用，无需后端即可开发', 'yellow');
    log('   • 使用 Feature-First 架构组织代码', 'yellow');
    log('   • 所有 @repo/* 包已自动配置\n', 'yellow');

    log('✨ 祝您开发愉快！\n', 'bright');
  } catch (error) {
    logError('创建应用时出错：');
    console.error(error);
    process.exit(1);
  }
}

main();

