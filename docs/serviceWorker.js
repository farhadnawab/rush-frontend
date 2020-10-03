const self = this;
const cacheName = 'rush-web-app';
const filesToCache = [
  '/rush-frontend/',
  '/rush-frontend/index.html',
  '/rush-frontend/multiple-shipments.html',
  '/rush-frontend/one-shipment.html',
  '/rush-frontend/main.css',
  '/rush-frontend/main.js',
  '/rush-frontend/fonts/Inter-Bold.woff',
  '/rush-frontend/fonts/Inter-Bold.woff2',
  '/rush-frontend/fonts/Inter-Medium.woff',
  '/rush-frontend/fonts/Inter-Medium.woff2',
  '/rush-frontend/fonts/Inter-Regular.woff',
  '/rush-frontend/fonts/Inter-Regular.woff2',
  '/rush-frontend/fonts/Metropolis-Bold.woff',
  '/rush-frontend/fonts/Metropolis-Bold.wof2',
  '/rush-frontend/fonts/Metropolis-Medium.woff',
  '/rush-frontend/fonts/Metropolis-Medium.wof2',
  '/rush-frontend/fonts/Metropolis-Regular.woff',
  '/rush-frontend/fonts/Metropolis-Regular.wof2',
];

self.addEventListener('install', (installEvent) => {
  installEvent.waitUntil(
    caches.open(cacheName).then((cache) => {
      cache.addAll(filesToCache);
    }).catch((err) => console.log(err)),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(
      event.request, { ignoreSearch: true },
    )
      .then((response) => response || fetch(event.request)
        .catch((err) => console.log(err))),
  );
});
