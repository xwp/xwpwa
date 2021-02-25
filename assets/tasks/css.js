const gulp = require('gulp'),
			postcss = require('gulp-postcss');
			rename = require('gulp-rename');

// Paths definitions
const scssSourcePath = 'assets/src/css/*.scss';
const outputPath = 'assets/dist/css';

gulp.task('sass', function(){
	return gulp.src(scssSourcePath)
		.pipe(postcss())
		.pipe(rename({suffix: '.min', extname: '.css'}))
		.pipe(gulp.dest(outputPath))
});

gulp.task( 'default', gulp.series( 'sass' ) );
