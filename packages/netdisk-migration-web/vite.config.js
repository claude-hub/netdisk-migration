/*
 * @Author: zhangyunpeng@sensorsdata.cn
 * @Description:
 * @Date: 2024-01-08 16:41:21
 * @LastEditTime: 2024-01-09 19:09:41
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 软链接
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '@': path.resolve(__dirname, '/src')
    }
  },
  
  server: {
    proxy: {
      // 使用 proxy 实例
      '/api': {
        target: 'http://localhost:3008',
        changeOrigin: true,
      },
    },
  },
});
