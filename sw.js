const CACHE_NAME = 'desafio-40k-cache-v1';
const urlsToCache = [
  './index.html',
  './manifest.json',
  './icon-192.png'
];

// Quando o app é aberto pela primeira vez, ele salva os arquivos offline
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Quando o app não tem internet, ele puxa do cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Achou no cache
        }
        return fetch(event.request); // Busca na internet
      })
  );
});
