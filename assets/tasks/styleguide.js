const gulp = require('gulp');
const styleguide = require('sc5-styleguide/lib/modules/cli/styleguide-cli');

// Paths definitions
const styleguideTitle = 'Styleguide';
const readmePath = 'assets/src/css/styleguide.md';
const kssSourcePath = 'assets/src/css/**/*.scss';
const styleSourcePath = 'assets/dist/css/*.css';

var outputPath = 'assets/styleguide';
// Absolute path when hosted
var appRootPath = '/assets/styleguide';

gulp.task( 'buildStyleguide', function() {
	let is_development_mode = true;
	if ( 'production' === process.env.NODE_ENV ) {
		is_development_mode = false;
	}
	styleguide( {
		title: styleguideTitle,
		overviewPath: readmePath,
		kssSource: kssSourcePath,
		styleSource: [
			styleSourcePath
		],
		rootPath: outputPath,
		output: outputPath,
		appRoot: appRootPath,
		watch: is_development_mode,
		server: false
	} );
});

gulp.task('default', [ 'buildStyleguide' ]);