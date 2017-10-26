importScripts('node_modules/workbox-sw/build/importScripts/workbox-sw.dev.v2.1.0.js');

const workboxSW = new WorkboxSW();
// The precache array gets filled with npm run theme recipe using the configuration inside  workbox-cli-config.js file.
workboxSW.precache([
  {
    "url": "assets/dist/css/main.css",
    "revision": "f0243b0aef373c787a695d2140a8a956"
  },
  {
    "url": "assets/html/index.html",
    "revision": "c9b2c0632b65c8af38195c6acf9720e1"
  },
  {
    "url": "assets/dist/js/main.js",
    "revision": "df96e617638095f26dc15ca2165274da"
  }
]);

/*

workboxSW.router.registerRoute('https://fonts.googleapis.com/(.*)',
  workboxSW.strategies.cacheFirst({
    cacheName: 'googleapis',
    cacheExpiration: {
      maxEntries: 20
    },
    cacheableResponse: {statuses: [0, 200]}
  })
);

workboxSW.router.registerRoute(/\.(?:png|gif|jpg)$/,
  workboxSW.strategies.cacheFirst({
    cacheName: 'images-cache',
    cacheExpiration: {
      maxEntries: 50
    }
  })
);

workboxSW.router.registerRoute('http://weloveiconfonts.com/(.*)',
  workboxSW.strategies.cacheFirst({
    cacheName: 'iconfonts',
    cacheExpiration: {
      maxEntries: 20,
      maxAgeSeconds: 7 * 24 * 60 * 60
    },
    cacheableResponse: {statuses: [0, 200]}
  })
);

workboxSW.router.registerRoute('/images/icon/*',
  workboxSW.strategies.staleWhileRevalidate({
    cacheName: 'icon-cache',
    cacheExpiration: {
      maxEntries: 20
    }
  })
);

var articleHandler = workboxSW.strategies.networkFirst({
  cacheName: 'articles-cache',
  cacheExpiration: {
    maxEntries: 50
  }
});

workboxSW.router.registerRoute('/pages/article*.html', args => {
  return articleHandler.handle(args).then(response => {
    if (!response) {
      return caches.match('pages/offline.html');
    } else if (response.status === 404) {
      return caches.match('pages/404.html');
    }
    return response;
  });
});

var postHandler = workboxSW.strategies.cacheFirst({
  cacheName: 'posts-cache',
  cacheExpiration: {
    maxEntries: 50
  }
});

workboxSW.router.registerRoute('/pages/post*.html', args => {
  return postHandler.handle(args).then(response => {
    if (response.status === 404) {
      return caches.match('pages/404.html');
    }
    return response;
  })
  .catch(function() {
    return caches.match('pages/offline.html');
  });
});

*/