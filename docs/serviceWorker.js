const self = this;
const cacheName = 'rush-web-app';
const filesToCache = [
  '/',
  '/index.html',
  '/multiple-shipments.html',
  '/one-shipment.html',
  '/main.css',
  '/main.js',
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
