'use strict';

var gulp = require('gulp'),
  to5 = require('gulp-6to5');

gulp.task('6to5', function() {
  return gulp.src('src/index.js')
    .pipe(to5({
      blacklist: ['useStrict'],
      modules: 'commonInterop'
    }))
    .pipe(gulp.dest('./'));
});