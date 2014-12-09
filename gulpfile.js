'use strict';

var gulp = require('gulp');

require('./tasks/6to5');
require('./tasks/browserify');
require('./tasks/test');
require('./tasks/watch');

gulp.task('default', ['6to5', 'browserify','test']);