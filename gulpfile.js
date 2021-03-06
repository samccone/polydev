'use strict';

var crisper = require('gulp-crisper');
let es = require('event-stream');
let gulp = require('gulp');

gulp.task('default', ['manifest', 'src', 'bower', 'element-zones', 'zone.js']);

gulp.task('manifest', function () {
  return gulp.src('manifest.json').pipe(gulp.dest('build/polydev/'));
});

gulp.task('zone.js', function() {
  return gulp.src('node_modules/zone.js/dist/zone-microtask.js')
    .pipe(gulp.dest('build/polydev/vendor/'));
});

gulp.task('element-zones', function() {
  return gulp.src('bower_components/element-zones/lib/element-zones.js')
    .pipe(gulp.dest('build/polydev/vendor/'));
});

gulp.task('src', function() {
  return es.merge(
      gulp.src('src/*.html')
        .pipe(crisper()),
      gulp.src(['src/*', '!src/*.html']))
    .pipe(gulp.dest('build/polydev/src'));
});

gulp.task('bower', function () {
  return es.merge(
      gulp.src([
          '!bower_components/{element-zones,element-zones/**}',
          'bower_components/**/*.html'])
        .pipe(crisper()),
      gulp.src([
          '!bower_components/{element-zones,element-zones/**}',
          '!bower_components/**/*.html',
          'bower_components/**/*']))
    .pipe(gulp.dest('build/polydev/bower_components'));
});
