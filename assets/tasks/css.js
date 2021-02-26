const gulp = require('gulp'),
			postcss = require('gulp-postcss');
			rename = require('gulp-rename');

// Paths definitions
const scssSourcePath = 'assets/src/css/';
const outputPath = 'assets/dist/css';

gulp.task('build', function(){
	return gulp.src(scssSourcePath + '*.scss' )
		.pipe(postcss())
		.pipe(rename({suffix: '.min', extname: '.css'}))
		.pipe(gulp.dest(outputPath))
});

gulp.task('watch', function(){
	gulp.watch(scssSourcePath +  '**/*.scss' , gulp.parallel( 'build' ));
})

gulp.task( 'default', gulp.series( 'build', 'watch' ) );
