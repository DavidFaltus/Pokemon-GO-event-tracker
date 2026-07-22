const isCapacitor = typeof window !== 'undefined' && !!(window as any).Capacitor;

const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

export const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || (!isCapacitor && isLocalhost
  ? 'http://localhost:4000'
  : 'https://pogo-tracker-backend-1084389140873.europe-west3.run.app');
