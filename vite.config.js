import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Use '/' for local development, '/menu-test2/' for GitHub Pages deployment
  server: {
    port: 3002,
  },
})

