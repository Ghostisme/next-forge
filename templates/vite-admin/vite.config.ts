import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@repo/rbac': path.resolve(__dirname, '../../packages/rbac'),
      '@repo/request': path.resolve(__dirname, '../../packages/request'),
      '@repo/charts': path.resolve(__dirname, '../../packages/charts'),
      '@repo/design-system': path.resolve(__dirname, '../../packages/design-system'),
      '@repo/internationalization': path.resolve(__dirname, '../../packages/internationalization'),
    },
  },
  define: {
    'process.env': {},
    'global': 'globalThis',
    '__dirname': JSON.stringify(''),
    '__filename': JSON.stringify(''),
  },
  server: {
    port: 5173,
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['lucide-react'],
          'd3-vendor': ['d3'],
        },
      },
    },
  },
});