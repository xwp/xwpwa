assetsPath = 'assets/';

module.exports = {
	'globDirectory': '.',
	'globPatterns': [
		assetsPath + 'dist/css/*.css',
		assetsPath + 'dist/js/*.js',
		assetsPath + 'images/blank.png',
		assetsPath + 'manifest.json',
		assetsPath + 'html/offline.html',
		assetsPath + 'html/404.html'
	],
	'globIgnores': [
		assetsPath + 'images/icons/*.{png,xml,ico,svg}'
	],
	'swSrc': assetsPath + 'src/js/sw.js',
	'swDest': 'sw.js'
};
