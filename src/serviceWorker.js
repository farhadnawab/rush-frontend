const self = this;
const cacheName = 'rush-web-app';
const filesToCache = [
  './',
  './index.html',
  './index-state-1.html',
  './one-shipment.html',
  './one-shipment-state-1.html',
  './one-shipment-state-2.html',
  './one-shipment-state-3.html',
  './hm-paris.html',
  './promotional-alert.html',
  './promotional-alert-1.html',
  './remember-me.html',
  './ups-cargo.html',
  './main.css',
  './main.js',
  './fonts/Inter-Bold.woff',
  './fonts/Inter-Bold.woff2',
  './fonts/Inter-Medium.woff',
  './fonts/Inter-Medium.woff2',
  './fonts/Inter-Regular.woff',
  './fonts/Inter-Regular.woff2',
  './fonts/Metropolis-Bold.woff',
  './fonts/Metropolis-Bold.wof2',
  './fonts/Metropolis-Medium.woff',
  './fonts/Metropolis-Medium.wof2',
  './fonts/Metropolis-Regular.woff',
  './fonts/Metropolis-Regular.wof2',
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
