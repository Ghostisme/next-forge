/**
 * 安全的 Token 存储管理
 */
class TokenStorage {
  private readonly TOKEN_KEY = 'app_token';
  private readonly REFRESH_TOKEN_KEY = 'app_refresh_token';

  /**
   * 保存 Token
   */
  setToken(token: string): void {
    if (typeof window === 'undefined') return;
    try {
      sessionStorage.setItem(this.TOKEN_KEY, token);
    } catch (error) {
      console.error('Failed to save token:', error);
    }
  }

  /**
   * 获取 Token
   */
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    try {
      return sessionStorage.getItem(this.TOKEN_KEY);
    } catch (error) {
      console.error('Failed to get token:', error);
      return null;
    }
  }

  /**
   * 保存 Refresh Token
   */
  setRefreshToken(token: string): void {
    if (typeof window === 'undefined') return;
    try {
      // Refresh Token 存储在 localStorage，有效期更长
      localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
    } catch (error) {
      console.error('Failed to save refresh token:', error);
    }
  }

  /**
   * 获取 Refresh Token
   */
  getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem(this.REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Failed to get refresh token:', error);
      return null;
    }
  }

  /**
   * 清除所有 Token
   */
  clearTokens(): void {
    if (typeof window === 'undefined') return;
    try {
      sessionStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Failed to clear tokens:', error);
    }
  }
}

export const tokenStorage = new TokenStorage();