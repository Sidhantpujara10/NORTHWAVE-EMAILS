import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig(({ mode }) => ({
  // Relative paths so the site works on GitHub Pages (/NORTHWAVE-EMAILS/)
  base: './',
  plugins: [react(), tailwindcss(), mode === 'single' && viteSingleFile()].filter(Boolean),
  build: mode === 'single' ? { outDir: 'dist-single' } : {},
}))
