#!/usr/bin/env node

import { execSync } from 'child_process';
import { copyFileSync, cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function main() {
  console.log('🚀 创建新的 SaaS 项目\n');

  const projectName = await question('项目名称: ');
  const projectType = await question('选择模板 (1: Vite Admin, 2: Next.js App): ');
  
  const templateMap: Record<string, string> = {
    '1': 'vite-admin',
    '2': 'next-app',
  };

  const template = templateMap[projectType] || 'vite-admin';
  const templatePath = join(process.cwd(), 'templates', template);
  const targetPath = join(process.cwd(), 'apps', projectName);

  if (existsSync(targetPath)) {
    console.error(`❌ 项目 "${projectName}" 已存在！`);
    process.exit(1);
  }

  console.log(`\n📦 使用模板: ${template}`);
  console.log(`📁 创建位置: ${targetPath}\n`);

  // 复制模板
  console.log('📋 复制模板文件...');
  cpSync(templatePath, targetPath, { recursive: true });

  // 更新 package.json
  const packageJsonPath = join(targetPath, 'package.json');
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
  packageJson.name = projectName;
  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  console.log('✅ 项目创建成功！\n');
  console.log('📝 后续步骤:');
  console.log(`   cd apps/${projectName}`);
  console.log('   pnpm install  # 或 npm install 或 yarn');
  console.log('   pnpm dev      # 或 npm run dev 或 yarn dev\n');

  rl.close();
}

main().catch(console.error);