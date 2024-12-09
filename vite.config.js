import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/cambioflex/', // Cambia 'cambioflex' por el nombre de tu repositorio
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        bcv: 'bcv.html',
        compare: 'compare.html',
        ep: 'ep.html'
      },
    },
  },
});