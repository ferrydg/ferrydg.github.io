self.addEventListener('install', (event) => {
  event.waitUntil(async function() {
    const cache = await caches.open('demo-cache');
    await cache.addAll([
      '/css/bootstrap.min.css',
      '/css/style.css',
      '/offline.html',
      '/svg/sad.svg'
    ]);
  }());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(async function() {
    const cachedResponse = await caches.match(event.request);
    if (cachedResponse) return cachedResponse;

    try {
      return await fetch(event.request);
    } catch (err) {
      return caches.match('/offline.html');
    }
  }());
});
