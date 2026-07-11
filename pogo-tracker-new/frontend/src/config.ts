const isCapacitor = typeof window !== 'undefined' && !!(window as any).Capacitor;

export const API_BASE_URL = !isCapacitor && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ? 'http://localhost:4000'
  : 'https://pogo-tracker-backend-1084389140873.europe-west3.run.app';

