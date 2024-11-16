import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import * as path from 'path';


export default defineConfig({
  plugins: [react()],
  build: {
    emptyOutDir: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name].[hash].js',
        entryFileNames: 'js/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
        manualChunks: {
          reactVendor: ['react', 'react-dom'],
        },
      },
    },
  },
  envDir: '../../',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3030,
  },
})
