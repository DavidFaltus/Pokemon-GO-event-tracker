export const CLOUD_RUN_BACKEND_URL = 'https://pogo-tracker-backend-1084389140873.europe-west3.run.app';

const isCapacitor = typeof window !== 'undefined' && !!(window as any).Capacitor;
const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

export const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || (!isCapacitor && isLocalhost
  ? 'http://localhost:4000'
  : CLOUD_RUN_BACKEND_URL);

/**
 * Robust API fetch with automatic fallback:
 * If the primary API_BASE_URL (e.g. http://localhost:4000) fails with a Network Error (server not running),
 * it automatically falls back to the live Cloud Run backend.
 */
export async function apiFetch(pathOrUrl: string, options?: RequestInit): Promise<Response> {
  const isFullUrl = pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://');
  const path = isFullUrl
    ? pathOrUrl.replace(/^https?:\/\/[^/]+/, '')
    : (pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`);

  const primaryUrl = isFullUrl ? pathOrUrl : `${API_BASE_URL}${path}`;

  try {
    const res = await fetch(primaryUrl, options);
    return res;
  } catch (primaryErr) {
    if (API_BASE_URL !== CLOUD_RUN_BACKEND_URL) {
      try {
        const fallbackUrl = `${CLOUD_RUN_BACKEND_URL}${path}`;
        const res = await fetch(fallbackUrl, options);
        return res;
      } catch {
        throw primaryErr;
      }
    }
    throw primaryErr;
  }
}
