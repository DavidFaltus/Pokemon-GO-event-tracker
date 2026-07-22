const CACHE_NAME = 'pokego-tracker-v5';
const ASSETS_TO_CACHE = [
  './',
  'manifest.json'
];

function isValidCacheRequest(request) {
  if (!request) return false;
  if (request.method !== 'GET') return false;
  const url = request.url || '';
  return url.startsWith('http://') || url.startsWith('https://');
}

// Install Event
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event (Network-first for API/Navigation, Cache-first for static assets)
self.addEventListener('fetch', (e) => {
  // Ignore non-http/https requests (e.g. chrome-extension://, moz-extension://)
  if (!e.request.url.startsWith('http://') && !e.request.url.startsWith('https://')) {
    return;
  }

  // Ignore non-GET requests (e.g. POST, PUT, DELETE)
  if (e.request.method !== 'GET') {
    return;
  }

  const url = new URL(e.request.url);

  // Navigation request: try network first, then fallback to cache
  if (e.request.mode === 'navigate' || url.pathname === '/' || url.pathname.endsWith('index.html')) {
    e.respondWith(
      fetch(e.request)
        .then((response) => {
          if (response && response.status === 200 && isValidCacheRequest(e.request)) {
            const clonedResponse = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(e.request, clonedResponse).catch(() => {});
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(e.request);
        })
    );
    return;
  }

  // GitHub / Scraped API call: try network first, then cache fallback
  if (url.hostname === 'raw.githubusercontent.com') {
    e.respondWith(
      fetch(e.request)
        .then((response) => {
          if (response && response.status === 200 && isValidCacheRequest(e.request)) {
            const clonedResponse = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(e.request, clonedResponse).catch(() => {});
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(e.request);
        })
    );
    return;
  }

  // Standard Cache-first strategy for static assets
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;
      return fetch(e.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        if (isValidCacheRequest(e.request)) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, responseToCache).catch(() => {});
          });
        }
        return networkResponse;
      });
    })
  );
});
