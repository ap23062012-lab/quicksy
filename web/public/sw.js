// public/sw.js
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  self.clients.claim();
});

self.addEventListener('fetch', () => {
  // A no-op fetch handler is required for Android Chrome installability
});