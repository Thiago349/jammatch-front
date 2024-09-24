import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: '/index.html'
    }
  },
  resolve: {
    alias: {
      'src': path.resolve(__dirname, './src')
    },
  },
})
