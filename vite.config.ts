import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isGithubPages = process.env.GITHUB_ACTIONS === 'true';
  return {
    plugins: [react()],
    base: isGithubPages ? '/Pokemon-GO-event-tracker/' : './',
    server: {
      host: true,
      port: 5173
    }
  }
})
