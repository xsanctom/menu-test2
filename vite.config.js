import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: '/menu-test2/', // Commented out for local development
  server: {
    port: 3002,
  },
})

