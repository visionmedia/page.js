'use strict';

var gulp = require('gulp'),
  Mocha = require('mocha'),
  fs = require('fs'),
  path = require('path');


gulp.task('test', function(cb) {

  var mocha = new Mocha();

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