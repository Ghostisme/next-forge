import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [
      react({
        // 启用 React Fast Refresh
        fastRefresh: true,
        // 支持 JSX runtime
        jsxRuntime: 'automatic',
      }),
    ],
    
    resolve: {
      alias: {
        // 应用路径别名
        '@': path.resolve(__dirname, './src'),
        '@features': path.resolve(__dirname, './src/features'),
        '@shared': path.resolve(__dirname, './src/shared'),
        '@core': path.resolve(__dirname, './src/core'),
        
        // Monorepo packages 别名 - 兼容 Next.js 基建
        '@repo/rbac': path.resolve(__dirname, '../../packages/rbac'),
        '@repo/request': path.resolve(__dirname, '../../packages/request'),
        '@repo/charts': path.resolve(__dirname, '../../packages/charts'),
        '@repo/design-system': path.resolve(__dirname, '../../packages/design-system'),
        '@repo/internationalization': path.resolve(__dirname, '../../packages/internationalization'),
        '@repo/state-management': path.resolve(__dirname, '../../packages/state-management'),
        '@repo/notifications': path.resolve(__dirname, '../../packages/notifications'),
      },
      
      // 确保只使用一个 React 实例
      dedupe: ['react', 'react-dom'],
      
      // 支持的文件扩展名
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },
    
    // 全局常量定义 - 兼容 Next.js 环境变量
    define: {
      'process.env': env,
      'global': 'globalThis',
      '__dirname': JSON.stringify(''),
      '__filename': JSON.stringify(''),
      // 兼容 Next.js 环境变量命名
      'process.env.NEXT_PUBLIC_API_URL': JSON.stringify(env.VITE_API_URL || ''),
    },
    
    // 开发服务器配置
    server: {
      port: 5173,
      host: true,
      open: true,
      
      // API 代理配置
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL || 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
        },
      },
    },
    
    // 构建配置
    build: {
      outDir: 'dist',
      sourcemap: true,
      
      // 代码分割配置 - 优化加载性能
      rollupOptions: {
        output: {
          // 手动代码分割
          manualChunks: {
            // React 核心库
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            
            // 状态管理
            'state-vendor': ['zustand', '@tanstack/react-query'],
            
            // UI 组件库
            'ui-vendor': ['lucide-react'],
            
            // 图表库
            'chart-vendor': ['d3'],
            
            // 表单处理
            'form-vendor': ['react-hook-form', 'zod'],
          },
          
          // 资源文件命名
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name?.split('.') || [];
            const ext = info[info.length - 1];
            
            if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico|webp)$/i.test(assetInfo.name || '')) {
              return `assets/images/[name]-[hash][extname]`;
            }
            if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name || '')) {
              return `assets/fonts/[name]-[hash][extname]`;
            }
            return `assets/[ext]/[name]-[hash][extname]`;
          },
        },
      },
      
      // 构建优化
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: mode === 'production',
        },
      },
      
      // Chunk 大小警告限制
      chunkSizeWarningLimit: 1000,
      
      // 启用 CSS 代码分割
      cssCodeSplit: true,
    },
    
    // CSS 配置
    css: {
      postcss: './postcss.config.mjs',
      devSourcemap: true,
    },
    
    // 优化依赖 - 排除 workspace 包避免预构建问题
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'lucide-react',
        'zustand',
        '@tanstack/react-query',
      ],
      exclude: [
        '@repo/design-system',
        '@repo/rbac',
        '@repo/request',
        '@repo/charts',
        '@repo/internationalization',
        '@repo/state-management',
        '@repo/notifications',
      ],
    },
    
    // 预览服务器配置
    preview: {
      port: 4173,
      host: true,
    },
  };
});

