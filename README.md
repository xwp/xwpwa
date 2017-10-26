# PWA Template

## Installation

```bash
npm install
```

or, using [Yarn](https://yarnpkg.com):

```bash
yarn install
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

The *assets/src/js/sw.js* gets compiled using the workbox cli to the root of the project. The configuration of the source and destination paths is inside *workbox-cli-config.js*.

### Precache

The cache-first strategy will be applied to all assets which match the **workbox-cli-config.js**. These will be pre-cached upon SW installation.
This is where the paths to the offline template should get defined, by adding a new item in the globPatterns array like:
```"assets/html/index.html"```

### 
