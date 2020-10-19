'use strict';

var gulp = require('gulp'),
    minjs = require('gulp-terser'), // минификация js
    mincss = require('gulp-minify-css'), // минификация css
    minhtml = require('gulp-minify-html'), // минификация html
    imagemin = require('gulp-imagemin'), // минификация картинок  
    webp = require('gulp-webp'),

    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    
    browserSync = require('browser-sync'),
    server = require('browser-sync').create();

gulp.task('style', function() {
  return gulp.src('src/styles/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('build/styles'))
    .pipe(mincss())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/styles'))
    .pipe(server.stream());
});

gulp.task('minjs', function(){
    return gulp.src('src/script/*.js')
  .pipe(minjs())
  .pipe(concat('main.js'))
  .pipe(rename({extname: '.min.js'}))
  .pipe(gulp.dest('build/script'))
});

gulp.task('minhtml', function(){
    return gulp.src('src/index.html')
  .pipe(minhtml())
  .pipe(gulp.dest('build'))
});

gulp.task('img', function () {
  return gulp.src('src/img/**')
    .pipe(gulp.dest('build/img'))
    .pipe(imagemin())
    .pipe(gulp.dest('build/img'));
});

gulp.task('copyfonts', function(){
  return gulp.src('src/fonts/**')
    .pipe(gulp.dest('build/fonts'))
});

gulp.task('serve', function() {
    gulp.watch('src/script/*.js', gulp.series('minjs'));
  
    gulp.watch('src/styles/**/*.scss', gulp.series('style'));
  
    gulp.watch('src/index.html', gulp.series('minhtml'));

    gulp.watch('src/img/**', gulp.series('img'));

  browserSync.init({
      server: 'build',
  });

  browserSync.watch('build/**/*.*').on('change', browserSync.reload);
});

gulp.task('build', gulp.series('minjs', 'minhtml', 'style', 'img', 'copyfonts'));

gulp.task('dev', gulp.series('build', gulp.parallel('serve')));