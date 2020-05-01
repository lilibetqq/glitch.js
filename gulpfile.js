'use strict';

var gulp = require('gulp'),
  del = require('del'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  csso = require('gulp-csso'),
  watch = require('gulp-watch'),
  livereload = require('gulp-livereload');


gulp.task('styles', function() {
  return gulp.src('src/scss/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      unix_newlines: true
    }).on('error', sass.logError))
    .pipe(rename("styles.min.css"))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('styles-optional', function() {
  return gulp.src('src/scss/*.scss')
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(rename("styles.css"))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function() {
  return gulp.src(['src/js/*.js'])
    .pipe(uglify())
    .pipe(concat('theme.min.js'))
    .pipe(gulp.dest('dist/js'));
});


gulp.task('default', function() {
  gulp.start('styles', 'styles-optional', 'scripts', 'watch');
});


gulp.task('watch', function() {
  gulp.watch('src/scss/*.scss', ['styles', 'styles-optional']);
  gulp.watch('src/js/*.js', ['scripts']);
  livereload.listen();
  gulp.watch(['*']).on('change', livereload.changed);
});
