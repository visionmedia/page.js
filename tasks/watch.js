'use strict';

var gulp = require('gulp'),
	 watch = require('gulp-watch');

gulp.task('watch', function() {
  watch('src/*.js', function() {
    gulp.start('default');
  });
});