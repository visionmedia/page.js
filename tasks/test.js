'use strict';

var gulp = require('gulp'),
  Mocha = require('mocha'),
  fs = require('fs'),
  minimist = require('minimist'),
  jsc = require('gulp-jscoverage'),
  path = require('path'),
  options = minimist(process.argv.slice(2));


gulp.task('test', ['coverage'], function(cb) {

  process.env.PAGE_COV = 1;

  var mocha = new Mocha({
    reporter: options.cov ? 'html-cov' : null
  });

  fs.readdirSync('test').filter(function(file) {
    // Only keep the .js files
    return file.substr(-3) === '.js' && file !== 'page.js';

  }).forEach(function(file) {
    // Use the method "addFile" to add the file to mocha
    mocha.addFile(
      path.join('test', file)
    );
  });

  // just run the tests
  mocha.run(function(results) {
    process.on('exit', function() {
      cb(results);
    });
  });

});

gulp.task('coverage', function() {
  return gulp.src('./index.js')
    .pipe(jsc())
    .pipe(gulp.dest('./'));
});