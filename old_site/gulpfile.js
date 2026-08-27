// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();

// Lint Task
gulp.task('lint', function() {
	return gulp.src('assets/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'app'
		}
	})
});

// Compile Our Sass
gulp.task('sass', function() {
	return gulp
		.src('assets/scss/base.scss')
		.pipe(concat('base.css'))
		.pipe(gulp.dest('assets/build'))
		.pipe(sass())
		.pipe(rename('base.min.css'))
		.pipe(gulp.dest('assets/build'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

// Concatenate & Minify JS
gulp.task('base-js', function() {
	return gulp.src('assets/js/*.js')
		.pipe(concat('base.js'))
		.pipe(gulp.dest('assets/build'))
		.pipe(rename('base.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('assets/build'));
});

// Watch Files For Changes
gulp.task('watch', function() {
	gulp.watch('assets/js/*.js', ['lint', 'base-js']);
	gulp.watch('assets/scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass','base-js', 'watch']); // 'watch'