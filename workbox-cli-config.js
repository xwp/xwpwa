module.exports = {
	"globDirectory": ".",
	"globPatterns": [
		"assets/dist/css/*.css",
		"assets/dist/js/*.js",
		"assets/images/blank.png"
	],
	"globIgnores": [
		"assets/images/icons/*.{png,xml,ico,svg}"
	],
	"swSrc": "assets/src/js/sw.js",
	"swDest": "sw.js"
};
