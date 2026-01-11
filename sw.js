const CACHE_NAME = 'social-compass-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon.svg',
  './icon-192.png',
  './icon-512.png'
];

// Инсталиране и кеширане
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Кеширане на файловете');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// Използване на кеша (Offline first)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Връщаме кеширания файл, ако го има, иначе теглим от мрежата
        return response || fetch(event.request);
      })
  );
});
