import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use '/menu-test2/' for GitHub Pages (CI builds), '/' for local development
  base: process.env.CI ? '/menu-test2/' : '/',
  server: {
    port: 3002,
  },
})

