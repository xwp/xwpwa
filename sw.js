const sw_debug = true;
const sw_version = sw_debug ? 'dev' : 'prod';
importScripts( 'node_modules/workbox-sw/build/importScripts/workbox-sw.' + sw_version + '.v2.1.0.js' );
const workboxSW = new WorkboxSW();

/* Cache first */
const webfontsRegex = 'https://(fonts.googleapis.com|fonts.gstatic.com)/(.*)';
const uploadsRegex = '/wp-content/uploads/(.*)';
const cdnImagesRegex = 'https://i(0|1|2).wp.com/(.*)/';
/* Stale with revalidate */
const avatarsRegex = 'https://(.*).gravatar.com/(.*)/';
const pluginsRegex = '/wp-content/plugins/(.*)';
/* Network First */
const htmlRegex = new RegExp( location.origin + '(.(?!(wp-admin|wp-content)))+' );

/*
 1. Cache-Only (Precache)
 Used for the site's critical assets.
 The precache array gets filled by workbox-cli using the configuration inside workbox-cli-config.js.
  */
workboxSW.precache([
  {
    "url": "assets/dist/css/main.css",
    "revision": "355cfd4c7248ba7a22249bdf1dddd2ee"
  },
  {
    "url": "assets/dist/js/main.js",
    "revision": "06231d8584f923e605ef03d67a37cda6"
  },
  {
    "url": "assets/images/blank.png",
    "revision": "272e7fe9a92e7d800df94406429e31b5"
  },
  {
    "url": "assets/manifest.json",
    "revision": "af739fec8b93710531f2aef139cbbcbd"
  },
  {
    "url": "assets/html/offline.html",
    "revision": "bda516cade4b1ddb447a3f885750fdbb"
  },
  {
    "url": "assets/html/404.html",
    "revision": "7d24a225683f030c329d878470f2eeb7"
  }
]);

/*
 2. Cache First, Network Fallback
 Store in cache all external web fonts, if a regex is defined.
 */
if ( webfontsRegex ) {
	workboxSW.router.registerRoute( webfontsRegex ,
		workboxSW.strategies.cacheFirst( {
			cacheName: 'webfonts',
			cacheExpiration: {
				maxEntries: 20
			},
			cacheableResponse: { statuses: [0, 200] }
		})
	);
}

if ( uploadsRegex ) {
	workboxSW.router.registerRoute( uploadsRegex,
		workboxSW.strategies.cacheFirst({
			cacheName: 'images',
			cacheExpiration: {
				maxEntries: 100,
				maxAgeSeconds: 14 * 24 * 60 * 60
			}
		})
	);
}

if ( cdnImagesRegex ) {
	workboxSW.router.registerRoute( cdnImagesRegex ,
		workboxSW.strategies.cacheFirst( {
			cacheName: 'images',
			cacheExpiration: {
				maxEntries: 100,
				maxAgeSeconds: 14 * 24 * 60 * 60
			},
			cacheableResponse: { statuses: [0, 200] }
		} )
	);
}

/*
 3. Cache-Network race (Stale while Revalidate)
 Store in cache external assets which can change frequently, like avatars,
 which are non-essential to the user experience.
 */
if ( avatarsRegex ) {
	workboxSW.router.registerRoute( avatarsRegex ,
		workboxSW.strategies.staleWhileRevalidate( {
			cacheName: 'avatars',
			cacheExpiration: {
				maxEntries: 40
			},
			cacheableResponse: { statuses: [0, 200] }
		})
	);
}

if ( pluginsRegex ) {
	workboxSW.router.registerRoute( pluginsRegex ,
		workboxSW.strategies.staleWhileRevalidate( {
			cacheName: 'plugins',
			cacheExpiration: {
				maxEntries: 100
			}
		})
	);
}

/*
 4. Network First, Cache Fallback
 Store in cache content which always needs to be shown up-to-date.
 */
if ( htmlRegex ) {
	var htmlHandler = workboxSW.strategies.networkFirst({
		cacheName: 'html',
		cacheExpiration: {
			maxEntries: 50
		}
	});

	workboxSW.router.registerRoute( htmlRegex, args => {
		return htmlHandler.handle( args ).then( response => {
			if ( !response ) {
				return caches.match( 'assets/html/offline.html' );
			}
			if ( response.status === 404 ) {
				return caches.match( 'assets/html/404.html' );
			}
			return response;
		});
	});

}
