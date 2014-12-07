'use strict';

var gulp = require('gulp'),
  rename = require('gulp-rename'),
  transform = require('vinyl-transform'),
  browserify = require('browserify');

gulp.task('browserify', function() {

  return gulp.src('./index.js')
    .pipe(transform(function(filename) {
      var b = browserify(filename, {
        standalone: 'page'
      });
      return b.bundle();
    }))
    .pipe(rename('page.js'))
    .pipe(gulp.dest('./'));

});
