export const CLOUD_RUN_BACKEND_URL = 'https://pogo-tracker-backend-1084389140873.europe-west3.run.app';

const isCapacitor = typeof window !== 'undefined' && !!(window as any).Capacitor;
const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

export const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || (!isCapacitor && isLocalhost
  ? 'http://localhost:4000'
  : CLOUD_RUN_BACKEND_URL);

const SCRAPED_DUCK_FALLBACKS: Record<string, string[]> = {
  '/api/raids': [
    'https://cdn.jsdelivr.net/gh/bigfoott/ScrapedDuck@data/raids.min.json',
    'https://fastly.jsdelivr.net/gh/bigfoott/ScrapedDuck@data/raids.min.json',
    'https://raw.githubusercontent.com/bigfoott/ScrapedDuck/data/raids.min.json'
  ],
  '/api/rocket': [
    'https://cdn.jsdelivr.net/gh/bigfoott/ScrapedDuck@data/rocket.min.json',
    'https://fastly.jsdelivr.net/gh/bigfoott/ScrapedDuck@data/rocket.min.json',
    'https://raw.githubusercontent.com/bigfoott/ScrapedDuck/data/rocket.min.json'
  ],
  '/api/eggs': [
    'https://cdn.jsdelivr.net/gh/bigfoott/ScrapedDuck@data/eggs.min.json',
    'https://fastly.jsdelivr.net/gh/bigfoott/ScrapedDuck@data/eggs.min.json',
    'https://raw.githubusercontent.com/bigfoott/ScrapedDuck/data/eggs.min.json'
  ],
  '/api/research': [
    'https://cdn.jsdelivr.net/gh/bigfoott/ScrapedDuck@data/research.min.json',
    'https://fastly.jsdelivr.net/gh/bigfoott/ScrapedDuck@data/research.min.json',
    'https://raw.githubusercontent.com/bigfoott/ScrapedDuck/data/research.min.json'
  ],
  '/api/events': [
    'https://cdn.jsdelivr.net/gh/bigfoott/ScrapedDuck@data/events.min.json',
    'https://fastly.jsdelivr.net/gh/bigfoott/ScrapedDuck@data/events.min.json',
    'https://raw.githubusercontent.com/bigfoott/ScrapedDuck/data/events.min.json'
  ],
};

/**
 * Robust API fetch with multi-level automatic fallback:
 * 1. Primary endpoint (e.g. http://localhost:4000 or process.env)
 * 2. Cloud Run production backend (if primary failed)
 * 3. ScrapedDuck CDN mirrors (if backend is unreachable)
 */
export async function apiFetch(pathOrUrl: string, options?: RequestInit): Promise<Response> {
  const isFullUrl = pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://');
  const cleanPath = isFullUrl
    ? pathOrUrl.replace(/^https?:\/\/[^/]+/, '').split('?')[0]
    : (pathOrUrl.startsWith('/') ? pathOrUrl.split('?')[0] : `/${pathOrUrl.split('?')[0]}`);

  const queryString = pathOrUrl.includes('?') ? `?${pathOrUrl.split('?')[1]}` : '';
  const primaryUrl = isFullUrl ? pathOrUrl : `${API_BASE_URL}${cleanPath}${queryString}`;

  // 1. Try Primary URL
  try {
    const res = await fetch(primaryUrl, options);
    if (res.ok) return res;
    // If not OK (e.g. 404/500/502) and we have fallbacks, proceed to fallbacks
  } catch (primaryErr) {
    // Network error on primary (e.g. localhost:4000 not running)
  }

  // 2. Try Cloud Run production backend (if different from primary)
  if (API_BASE_URL !== CLOUD_RUN_BACKEND_URL) {
    try {
      const fallbackUrl = `${CLOUD_RUN_BACKEND_URL}${cleanPath}${queryString}`;
      const res = await fetch(fallbackUrl, options);
      if (res.ok) return res;
    } catch {
      // Cloud Run failed
    }
  }

  // 3. Try ScrapedDuck CDN mirrors
  const cdnMirrors = SCRAPED_DUCK_FALLBACKS[cleanPath];
  if (cdnMirrors && cdnMirrors.length > 0) {
    for (const cdnUrl of cdnMirrors) {
      try {
        const res = await fetch(`${cdnUrl}?t=${Math.floor(Date.now() / 60000)}`);
        if (res.ok) return res;
      } catch {
        // try next CDN
      }
    }
  }

  // Final attempt: fallback directly to primary fetch
  return fetch(primaryUrl, options);
}
