// importScripts('/js/sw-toolbox.js');
//
// toolbox.options.debug = true;
//
// toolbox.precache(['/offline.html', '/svg/sad.svg', '/js/sw-toolbox.js']);
//
// // toolbox.router.get('/',
// //   function(request, values, options) {
// //     console.log('/ requested');
// //     event.respondWith(new Response('pipo'));
// //     // return toolbox.networkFirst(request, values, options)
// //     // .catch(function(err) {
// //     //   caches.match(new Request('offline.html'));
// //     // });
// //   },
// //   { cache: { name: 'html', maxAgeSeconds: 86400 /* cache for a day */ }}
// // );
//
//
//
//
//
//
// toolbox.router.get('/*.css', toolbox.cacheFirst);
//
// toolbox.router.get('/*.js', toolbox.cacheFirst);
//
// toolbox.router.get('/', function(request, values, options) {
//   return toolbox.networkFirst(request, values, options)
//     .catch(function(err) {
//       caches.match(new Request('/offline.html'));
//     });
// });
//
//
// // toolbox.router.get('/', function(request, values, options) {
// //   console.log('.html requested');
// //   return toolbox.networkOnly(request, values, options);
// // });
// //
// // toolbox.router.default = toolbox.networkOnly;

// self.addEventListener('fetch', function (event) {
//   event.respondWith(fetch(event.request)
//     .catch(function () {
//       return new Response('<h1>OFFLINE</h1><p>It seems you are offline</p>', {headers: {'Content-Type': 'text/html'}});
//     })
//   );
// });

self.addEventListener('install', (event) => {
  event.waitUntil(async function() {
    const cache = await caches.open('demo-cache');
    await cache.addAll(
      [
        '/css/bootstrap.css',
        '/css/style.css',
        '/offline.html',
        '/svg/sad.svg'
      ]
    );
  }());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(async function() {
    // Try the cache
    const cachedResponse = await caches.match(event.request);
    if (cachedResponse) return cachedResponse;

    try {
      // Fall back to network
      return await fetch(event.request);
    } catch (err) {
      // If both fail, show a generic fallback:
      return caches.match('/offline.html');
      // However, in reality you'd have many different
      // fallbacks, depending on URL & headers.
      // Eg, a fallback silhouette image for avatars.
    }
  }());
});
