var gulp   = require('gulp'),
		jshint = require('gulp-jshint'),
		sass = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		minifycss = require('gulp-minify-css'),
		rename = require('gulp-rename'),
		browserSync = require('browser-sync'),
		nodemon = require('gulp-nodemon'),
		reload      = browserSync.reload;

gulp.task('default', ['start', 'browser-sync', 'jshint', 'styles', 'watch']);

gulp.task('start', function () {
  nodemon({
    script: 'server.js'
  })
});

gulp.task('jshint', function() {
	return gulp.src('./public/scripts/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(reload({stream: true}));
});

gulp.task('styles', function() {
	gulp.src('./public/css/main.scss')
		.pipe(sass({
	  	"sourcemap=none": true
	  }))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
		.pipe(gulp.dest('./public/css'))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest('./public/css'))
		.pipe(reload({stream: true}));
});

gulp.task('browser-sync', function() {
	browserSync({
		server: { baseDir: "./public" }
	});
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
	gulp.watch('./public/scripts/**/*.js', ['jshint']);
	gulp.watch('./public/css/**/*.scss', ['styles']);
	gulp.watch('./public/**/*.html', reload);
});