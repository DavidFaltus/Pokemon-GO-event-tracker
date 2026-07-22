const CACHE_NAME = 'pokego-tracker-v6';

// Install Event - skip waiting immediately
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

// Activate Event - delete ALL old caches and claim clients
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event
self.addEventListener('fetch', (e) => {
  // Ignore non-http/https requests (e.g. chrome-extension://, moz-extension://)
  if (!e.request.url.startsWith('http://') && !e.request.url.startsWith('https://')) {
    return;
  }

  // Ignore non-GET requests
  if (e.request.method !== 'GET') {
    return;
  }

  // CRITICAL: NEVER cache navigation requests (HTML pages). Always fetch fresh from network!
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    );
    return;
  }

  const url = new URL(e.request.url);

  // GitHub / Scraped API call: try network first, then cache fallback
  if (url.hostname === 'raw.githubusercontent.com') {
    e.respondWith(
      fetch(e.request)
        .then((response) => {
          if (response && response.status === 200) {
            const clonedResponse = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(e.request, clonedResponse).catch(() => {});
            });
          }
          return response;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // Static assets (images, fonts): cache-first with network fallback
  if (url.pathname.match(/\.(png|jpg|jpeg|svg|gif|webp|woff2?|ttf)$/i)) {
    e.respondWith(
      caches.match(e.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        return fetch(e.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(e.request, responseToCache).catch(() => {});
            });
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // All other requests pass straight to network
  e.respondWith(fetch(e.request));
});
