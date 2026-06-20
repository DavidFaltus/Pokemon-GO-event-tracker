const CACHE_NAME = 'pokego-tracker-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/index.css',
  '/manifest.json'
];

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

// Fetch Event (Network-first for API, Cache-first for assets)
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  // If it is the ScrapedDuck API call, try network first, then cache fallback
  if (url.hostname === 'raw.githubusercontent.com') {
    e.respondWith(
      fetch(e.request)
        .then((response) => {
          const clonedResponse = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, clonedResponse);
          });
          return response;
        })
        .catch(() => {
          return caches.match(e.request);
        })
    );
    return;
  }

  // Otherwise, standard Cache-first strategy
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;
      return fetch(e.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(e.request, responseToCache);
        });
        return networkResponse;
      });
    })
  );
});
