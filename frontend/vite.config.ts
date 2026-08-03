import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(() => {
  const isGithubPages = process.env.GITHUB_ACTIONS === 'true';
  return {
    plugins: [react()],
    base: isGithubPages ? '/Pokemon-GO-event-tracker/' : './',
    server: {
      host: true,
      port: 5173
    },
    build: {
      // Target modern browsers for smaller output
      target: 'es2020',
      // Increase chunk size warning limit (heavy data files are expected)
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          // Manual chunk splitting for better caching
          manualChunks: (id) => {
            // React core - changes rarely, long-lived cache
            if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
              return 'vendor-react';
            }
            // Lucide icons - separate chunk, changes with icon updates only
            if (id.includes('node_modules/lucide-react')) {
              return 'vendor-lucide';
            }
            // All other node_modules in one vendor chunk
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          // Consistent chunk file naming with content hash for cache busting
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
        }
      }
    }
  }
})

