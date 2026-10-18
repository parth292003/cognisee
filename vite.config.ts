import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: process.env.GITHUB_PAGES ? '/cognisee/' : './',
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    proxy: {
      '/assets/geometries': {
        target: 'https://www.igloo.inc',
        changeOrigin: true,
      },
      '/assets/libs': {
        target: 'https://www.igloo.inc',
        changeOrigin: true,
      },
      '/assets/audio': {
        target: 'https://www.igloo.inc',
        changeOrigin: true,
      },
      '/assets/gltf': {
        target: 'https://www.igloo.inc',
        changeOrigin: true,
      },
      '/assets/cubes': {
        target: 'https://www.igloo.inc',
        changeOrigin: true,
      },
      '/assets/ui': {
        target: 'https://www.igloo.inc',
        changeOrigin: true,
      },
      '/assets/fonts': {
        target: 'https://www.igloo.inc',
        changeOrigin: true,
      },
      '/assets/images': {
        target: 'https://www.igloo.inc',
        changeOrigin: true,
      },
    }
  }
});
