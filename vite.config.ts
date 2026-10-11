import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// `base: './'` makes the build work from any URL path, so the same output can be
// served at https://<user>.github.io/ or https://<user>.github.io/<repo>/.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
