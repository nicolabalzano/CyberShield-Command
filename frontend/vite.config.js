import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: true, // Needed for Docker
    allowedHosts: [
      'cybershield.mntcrl.it'
    ],
    proxy: {
      '/api': {
        target: 'cybershield.mntcrl.it',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
