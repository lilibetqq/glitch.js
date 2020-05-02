'use strict';

var gulp = require('gulp'),
    del = require('del'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    terser = require('gulp-terser'),
    uglifycss = require('gulp-uglifycss'),
    sass = require('gulp-sass'),
    csso = require('gulp-csso'),
    watch = require('gulp-watch'),
    sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload');

gulp.task('styles', function() {
  return gulp.src('src/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed',
      unix_newlines: true
    }).on('error', sass.logError))
    .pipe(rename("styles.min.css"))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('styles-optional', function() {
  return gulp.src('src/scss/*.scss')
    .pipe(sourcemaps.init())

    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(rename("styles.css"))
    .pipe(uglifycss({
      "maxLineLen": 80,
      "uglyComments": true
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))

});

gulp.task('scripts', function() {
  return gulp.src('src/js/*.js')
    .pipe(sourcemaps.init({
      largeFile: true
    }))
    .pipe(terser())
    .pipe(concat('styles.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'));
});


// gulp.task('default', function() {
//   gulp.start(['styles', 'styles-optional', 'scripts', 'watch']);
// });

gulp.task('default', gulp.series('styles', 'styles-optional', 'scripts'), function(done) {
  devMode = true;
  gulp.watch('src/scss/*.scss', gulp.series('styles', 'styles-optional'));
  gulp.watch('src/js/*.js', gulp.series('scripts'));
});


gulp.task('watch', function() {
  gulp.watch('src/scss/*.scss', gulp.series('styles', 'styles-optional'));
  gulp.watch('src/js/*.js', gulp.series('scripts'));
  livereload.listen();
  gulp.watch(['*']).on('change', livereload.changed);
});
