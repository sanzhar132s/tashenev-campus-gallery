import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  server: { watch: { ignored: ['**/work/**', '**/outputs/**'] } },
  resolve: {
    alias: { '@': new URL('./src', import.meta.url).pathname.replace(/^\/(?=[A-Za-z]:)/, '') },
  },
  plugins: [tailwindcss()],
})
