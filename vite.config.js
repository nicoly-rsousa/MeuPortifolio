import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base relativa para funcionar em https://nicoly-rsousa.github.io/MeuPortifolio/
export default defineConfig({
  base: './',
  plugins: [react()]
});
