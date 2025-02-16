import { defineConfig } from 'vite'
import tailwindcss from "@tailwindcss/vite";
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {'@styles': path.resolve(__dirname, './src/styles')},
  },
  plugins: [
    tailwindcss(),
  ],
})
