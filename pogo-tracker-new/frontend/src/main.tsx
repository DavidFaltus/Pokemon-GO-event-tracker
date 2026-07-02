import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Register Service Worker for PWA offline capability
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    const base = import.meta.env.BASE_URL;
    const swPath = base.endsWith('/') ? `${base}sw.js` : `${base}/sw.js`;
    navigator.serviceWorker.register(swPath)
      .then((reg) => console.log('Service Worker registered!', reg.scope))
      .catch((err) => console.error('Service Worker registration failed:', err));
  });
}

