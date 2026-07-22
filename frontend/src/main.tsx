import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Register Service Worker for PWA offline capability
const metaEnv = (import.meta as any).env || {};
if ('serviceWorker' in navigator && metaEnv.PROD) {
  window.addEventListener('load', () => {
    const base = metaEnv.BASE_URL || '/';
    const swPath = base.endsWith('/') ? `${base}sw.js` : `${base}/sw.js`;
    navigator.serviceWorker.register(swPath)
      .then((reg) => {
        console.log('Service Worker registered!', reg.scope);
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'activated') {
                window.location.reload();
              }
            });
          }
        });
      })
      .catch((err) => console.error('Service Worker registration failed:', err));
  });
}

