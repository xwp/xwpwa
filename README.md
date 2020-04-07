# PWA Template

## Installation

```bash
npm install
```

or, using [Yarn](https://yarnpkg.com):

```bash
yarn install
```

Then
```bash
npm run dev
```

## Server
You can run a server, for reading the documentation or testing.
```bash
npm run server
```

## Configuration

### Application Titles

Find **PWA Long Name** and replace by the application title.

Find **PWA Name** and replace by your own application short title. This title is used when bookmarking the app to the home screen, and should not be longer than 11-15 characters to avoid cropping.

Change the **pwa_name** inside the package.json along the git URLs.

### Branding Colors

#### Choose background color hex ( #ffffff ).

Replace it in **assets/tasks/icons.js** to line 18 `const brandBackgroundColor`.

Replace it in **assets/manifest.json** to line 4 `"background_color"`.

#### Choose theme color hex ( #000000 ).

Replace it in **assets/manifest.json** to line 5 `"theme_color"`.

Replace it in **assets/html/index.html** to lines 20 `"theme-color"`.

Replace it in **assets/html/index.html** to lines 42 `"mask-icon"`. You can improve the visibility of the Safari Pinned Tab Icons by avoiding light colors such as white, bright yellow, or light gray.

#### Choose metro color hex ( #eff4ff ).

Pick from [Metro UI Colors](https://colorlib.com/etc/metro-colors/).

Replace it in **assets/html/index.html** to line 32 `"msapplication-TileColor"`.

### Icons

Update **assets/images/icon.png** with a high resolution, square PNG graphic.
SVGs are supported, and can be provided by updating `const iconSrc` inside **assets/tasks/icons.js**.

Run the following command to generate all icon sizes from NPM using the [RealFaviconGenerator API](https://realfavicongenerator.net/):

```bash
npm run icons
```

Verify the path to /assets/manifest.json file in the Icons section of the template file has the correct paths to the icons and check them in Chrome Inspector's Application tab.

## Service Worker

The *assets/src/js/sw.js* gets compiled using the workbox-cli to the root of the project. The configuration of the source and destination paths is inside *workbox-cli-config.js*.

Compile the service worker automatically with the following command:
```bash
npm run sw
```

Building for production compiles the service worker automatically.

### Debugging

Turning the sw_debug to true enables the workbox debugging mode by loading the development service worker.
```js
const sw_debug = true;
```

## SW Caching Strategies

### 1. Cache-Only (Precache)

The cache-first strategy will be applied to all internal assets which match the **workbox-cli-config.js**. These will be pre-cached upon SW installation.
This is where the paths to the offline template should get defined, by adding a new item in the globPatterns array like:
```"assets/html/index.html"```

### 2. Cache First, Network Fallback

Defining the regular expression for the external web fonts URL enables the webfonts cache for storing them using the cache-first strategy.
The regular expression can contain multiple domains for the fonts, like this example with fonts loading from both Typography and Google APIs.

Regular content imagery can be cached using the same strategy. Recommend this over stale while revalidate because newly upload imagery receives new URLs. Precached image assets won't be cached a second time.
```js
const webfontsRegex = 'https://(fonts.googleapis.com|cloud.typography.com)/(.*)';
const uploadsRegex = '/wp-content/uploads/(.*)';
const cdnImagesRegex = 'https://i(0|1|2).wp.com/(.*)/';
```

External image assets sometimes do not show up in the Cache Storage due to the browser deciding to store them in the main disk cache instead. Successful caching is confirmed by their presence in the corresponding IndexedDB and by the request not failing with the browser in offline mode.

Application icons defined in the manifest can't get intercepted by the service worker, hence there's no need to define custom caching strategies for them.

### 3. Cache-Network race (Stale while Revalidate)

This strategy is to be used for the assets which can change frequently, but are non-essential to the user experience to show the latest right away.

Defining the avatars regular expression enables the cache for storing them using the stale while revalidate (cache-network race) strategy.

Only a check for the presence of an updated assets is done, and does not re-downloading the entire assets.

```js
const avatarsRegex = 'https://(.*).gravatar.com/(.*)';
const pluginsRegex = '/wp-content/plugins/(.*)';
```

### 4. Network First, Cache Fallback

Some content must always be kept up-to-date, and with this strategy we fetch the newest content first, and only if that fails the sw delivers old content from the cache.

The ```htmlRegex``` is setup as a final catch all for local paths that don't fall inside of the wp-admin path.

The 404 and Offline pages are defined in the manifest and referenced to the cached files from inside the service worker's networkFirst strategy.

 ### 5. Network only

 Without setting up a specific caching strategy to an outside domain, any other external domains won't get their assets cached by the service worker.
