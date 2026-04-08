import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/shoppingreact/',
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 8888,
  },
})