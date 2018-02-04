const gulp = require('gulp');
const styleguide = require('sc5-styleguide/lib/modules/cli/styleguide-cli');

gulp.task( 'buildStyleguide', function() {
	let development_mode_active = true;
	if ( 'production' === process.env.NODE_ENV ) {
		development_mode_active = false;
	}
	styleguide({

		// Styleguide title
		title: 'Styleguide',

		// Styleguide overview path
		overviewPath: 'assets/src/css/styleguide.md',

		// KSS source material
		kssSource: 'assets/src/css/**/*.scss',

		// Stylesheets to include
		// global.css: primary site styles
		// styleguide.css: styleguide-only styles
		styleSource: [
			'assets/dist/css/main.css'
		],

		rootPath: '/assets/styleguide',

		appRoot: '/assets/styleguide',

		// Output path
		output: 'assets/styleguide',

		// Watch for changes
		watch: development_mode_active,

		// Serve
		server: false

	});

});

gulp.task('default', [ 'buildStyleguide' ]);