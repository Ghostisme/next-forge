import type { TokenPayload } from '../types';

/**
 * 解析 JWT Token（不验证签名，仅解析）
 */
export function decodeToken(token: string): TokenPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    const payload = parts[1];
    const decoded = JSON.parse(
      decodeURIComponent(
        atob(payload)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
    );

    return decoded as TokenPayload;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
}

/**
 * 检查 Token 是否过期
 */
export function isTokenExpired(token: string): boolean {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) {
    return true;
  }

  // JWT exp 是秒级时间戳，需要转换为毫秒
  const expirationTime = decoded.exp * 1000;
  const currentTime = Date.now();

  // 提前 5 分钟判定为过期（用于自动刷新）
  return currentTime >= expirationTime - 5 * 60 * 1000;
}

/**
 * 获取 Token 剩余有效时间（毫秒）
 */
export function getTokenRemainingTime(token: string): number {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) {
    return 0;
  }

  const expirationTime = decoded.exp * 1000;
  const currentTime = Date.now();
  return Math.max(0, expirationTime - currentTime);
}