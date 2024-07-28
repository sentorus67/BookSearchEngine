import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3211,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3211',
        secure: false,
        changeOrigin: true
      }
    }
  }
})
