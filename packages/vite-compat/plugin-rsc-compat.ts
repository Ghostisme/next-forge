import type { Plugin } from 'vite';

export function pluginRscCompat(): Plugin {
  const RSC_DIRECTIVES_REGEX = /^\s*["']use\s+(client|server)["'];?\s*$/gm;
  const VALID_EXTENSIONS = /\.(tsx?|jsx?)$/;
  
  return {
    name: 'vite-plugin-rsc-compat',
    enforce: 'pre',
    
    transform(code: string, id: string) {
      if (!VALID_EXTENSIONS.test(id)) {
        return null;
      }
      
      if (id.includes('node_modules') && !id.includes('@repo')) {
        return null;
      }
      
      if (!RSC_DIRECTIVES_REGEX.test(code)) {
        return null;
      }
      
      const transformedCode = code.replace(RSC_DIRECTIVES_REGEX, '');
      
      return {
        code: transformedCode,
        map: null,
      };
    },
    
    config() {
      return {
        optimizeDeps: {
          include: [
            '@repo/design-system',
            '@repo/rbac',
            '@repo/request',
            '@repo/charts',
            '@repo/state-management',
          ],
        },
      };
    },
  };
}