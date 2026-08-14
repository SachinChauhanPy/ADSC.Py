import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [reactRouter(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, './src/'),
      '@/components': resolve(import.meta.dirname, './src/components'),
      '@/pages': resolve(import.meta.dirname, './src/pages'),
      '@/schemas': resolve(import.meta.dirname, './src/schemas'),
      '@/lib': resolve(import.meta.dirname, './src/lib'),
    },
  },
});
