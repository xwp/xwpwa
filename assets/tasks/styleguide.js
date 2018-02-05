const gulp = require('gulp');
const styleguide = require('sc5-styleguide/lib/modules/cli/styleguide-cli');

gulp.task( 'buildStyleguide', function() {
	let is_development_mode = true;
	if ( 'production' === process.env.NODE_ENV ) {
		is_development_mode = false;
	}
	styleguide({

		// Styleguide title
		title: 'Styleguide',

		// Styleguide overview path
		overviewPath: 'assets/src/css/styleguide.md',

		// KSS source material
		kssSource: 'assets/src/css/**/*.scss',

		// Stylesheets to include
		styleSource: [
			'assets/dist/css/main.css'
		],

		rootPath: '/assets/styleguide',

		appRoot: '/assets/styleguide',

		// Output path
		output: 'assets/styleguide',

		// Watch for changes
		watch: is_development_mode,

		// Serve
		server: false

	});

});

gulp.task('default', [ 'buildStyleguide' ]);