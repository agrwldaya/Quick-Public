import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'; // Import plugin
// https://vitejs.dev/config/
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [react(),tsconfigPaths(),visualizer()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', '@reduxjs/toolkit'],
        },
      },
    },
  },
})
