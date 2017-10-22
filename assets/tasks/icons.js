/**
 * Icons generation Gulp task.
 *
 * Please note that this task should be used in with front-end assets workflow tool - `fe-dev-lib`
 * which is imported in the project through NPM.
 *
 * All other NPM dependencies used here are already imported to the project even though they are not
 * explicitly listed in the `dependencies` list in the `package.json`. This is because of the fact that
 * they are part of the `fe-dev-lib` package dependencies list and thus part of this project as well.
 *
 * @package PWA Name
 */

const gulp = require( 'gulp' );
const del = require( 'del' );
const realFavicon = require ('gulp-real-favicon');

const brandBackgroundColor = '#ffffff';
const cwd = 'assets/';
const iconSrc = cwd + 'images/icon.png';
const iconDest = cwd + 'images/icons/';
const iconPath = '/' + iconDest;
const faviconDataFile = iconDest + 'faviconData.json';
const iconConfig = {
	masterPicture: iconSrc,
	dest: iconDest,
	iconsPath: iconPath,
	design: {
		ios: {
			pictureAspect: 'backgroundAndMargin',
			backgroundColor: brandBackgroundColor,
			margin: '0%',
			assets: {
				ios6AndPriorIcons: false,
				ios7AndLaterIcons: true,
				precomposedIcons: false,
				declareOnlyDefaultIcon: true
			}
		},
		desktopBrowser: {},
		windows: {
			pictureAspect: 'noChange',
			onConflict: 'override',
			assets: {
				windows80Ie10Tile: false,
				windows10Ie11EdgeTiles: {
					small: true,
					medium: true,
					big: true,
					rectangle: true
				}
			}
		},
		androidChrome: {
			pictureAspect: 'shadow',
			manifest: {
				onConflict: 'override',
				declared: true
			},
			assets: {
				legacyIcon: true,
				lowResolutionIcons: true
			}
		},
		safariPinnedTab: {
			pictureAspect: 'silhouette'
		}
	},
	settings: {
		compression: 2,
		scalingAlgorithm: 'Mitchell',
		errorOnImageTooSmall: false
	},
	markupFile: faviconDataFile
};

const generateIcons = function(done) {
	realFavicon.generateFavicon( iconConfig, function() {
		done();
	} );
};

const delRedundantManifest = function(done) {
	del( [ iconDest + 'manifest.json' ]).then( function() {
		done();
	} );
};

module.exports = gulp.series( generateIcons, delRedundantManifest );
