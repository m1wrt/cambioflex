import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/cambioflex/', // Cambia 'cambioflex' por el nombre de tu repositorio
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, '/index.html'),
        bcv: resolve(__dirname, '/bcv.html'),
        compare: resolve(__dirname, '/compare.html'),
        ep: resolve(__dirname, '/ep.html'),
        support: resolve(__dirname, '/support')
      },
    },
  },
});
