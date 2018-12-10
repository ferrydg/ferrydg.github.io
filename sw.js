importScripts('js/sw-toolbox.js');

toolbox.options.debug = true;

toolbox.precache(['/offline.html', '/svg/sad.svg', '/js/sw-toolbox.js']);

// toolbox.router.get('/',
//   function(request, values, options) {
//     console.log('/ requested');
//     event.respondWith(new Response('pipo'));
//     // return toolbox.networkFirst(request, values, options)
//     // .catch(function(err) {
//     //   caches.match(new Request('offline.html'));
//     // });
//   },
//   { cache: { name: 'html', maxAgeSeconds: 86400 /* cache for a day */ }}
// );






toolbox.router.get('/*.css', toolbox.cacheFirst);

toolbox.router.get('/*.js', toolbox.cacheFirst);

toolbox.router.get('/', function(request, values, options) {
  return toolbox.networkOnly(request, values, options)
    .catch(function(err) {
      caches.match(new Request('/offline.html'));
    });
});


// toolbox.router.get('/', function(request, values, options) {
//   console.log('.html requested');
//   return toolbox.networkOnly(request, values, options);
// });
//
// toolbox.router.default = toolbox.networkOnly;