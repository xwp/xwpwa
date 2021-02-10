const gulp = require('gulp'),
			sass = require('gulp-sass'),
			rename = require('gulp-rename'),
			prefix = require('gulp-autoprefixer');

// Paths definitions
const scssSourcePath = 'assets/src/css/**/*.scss';
const outputPath = 'assets/dist/css';

gulp.task('sass', function(){
	return gulp.src(scssSourcePath)
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(prefix())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(outputPath))
});

gulp.watch(scssSourcePath, ['sass']);

gulp.task('default', [ 'sass' ]);
