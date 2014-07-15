var gulp = require('gulp'),
jshint = require('gulp-jshint'),
mocha = require('gulp-mocha'),

// Paths configuration.
paths = {
  scripts: [
    'generators/**/*.js',
    'test/**/*.js',
    'gulpfile.js'
    ],
  tests: 'test/**/*-test.js'
},
stylish = require('jshint-stylish');


// Scripts tasks.
gulp.task('scripts', function() {
  'use strict';
  gulp.src(paths.scripts)
  .pipe(jshint())
  .pipe(jshint.reporter(stylish));
});


gulp.task('tests', function() {
  'use strict';
  gulp.src(paths.tests, {read: false})
  .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('default',['scripts','tests']);


gulp.task('watch', function() {
  'use strict';
  gulp.watch(paths.scripts, ['scripts','tests']);
});
