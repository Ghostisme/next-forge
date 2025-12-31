import { execSync } from 'child_process';
import { existsSync } from 'fs';

/**
 * 检测项目使用的包管理工具
 */
export function detectPackageManager(): 'pnpm' | 'npm' | 'yarn' {
  // 检查 lock 文件
  if (existsSync('pnpm-lock.yaml')) {
    return 'pnpm';
  }
  if (existsSync('yarn.lock')) {
    return 'yarn';
  }
  if (existsSync('package-lock.json')) {
    return 'npm';
  }

  // 检查全局安装的包管理器
  try {
    execSync('pnpm --version', { stdio: 'ignore' });
    return 'pnpm';
  } catch {}

  try {
    execSync('yarn --version', { stdio: 'ignore' });
    return 'yarn';
  } catch {}

  return 'npm';
}

/**
 * 获取包管理器的安装命令
 */
export function getInstallCommand(pm: string): string {
  const commands = {
    pnpm: 'pnpm install',
    npm: 'npm install',
    yarn: 'yarn',
  };
  return commands[pm as keyof typeof commands] || 'npm install';
}

/**
 * 获取包管理器的运行命令
 */
export function getRunCommand(pm: string, script: string): string {
  const commands = {
    pnpm: `pnpm ${script}`,
    npm: `npm run ${script}`,
    yarn: `yarn ${script}`,
  };
  return commands[pm as keyof typeof commands] || `npm run ${script}`;
}