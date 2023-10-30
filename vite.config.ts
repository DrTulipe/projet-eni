import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
 
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://projet-eni-back:8000/',
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^/api/, '')
      }
    }
  }
});