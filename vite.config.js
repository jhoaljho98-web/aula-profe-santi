import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// base '/aula-profe-santi/' para GitHub Pages en producción.
// En dev queda '/' automáticamente.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/aula-profe-santi/' : '/',
}))
