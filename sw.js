importScripts('js/sw-toolbox.js');

toolbox.precache(['/offline.html', '/svg/sad.svg']);

toolbox.router.get(/.*\.[css|js]$/, toolbox.cacheFirst);

toolbox.router.get(/^index\.html$/, toolbox.networkFirst);