import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/plugin': {
        target: 'https://acessos.vlibras.gov.br',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/plugin/, ''),
      },
    },
  },
})