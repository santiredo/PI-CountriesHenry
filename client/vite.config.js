import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Esta línea indica la carpeta de salida
  },
  server: {
    host: '0.0.0.0'
  }
})