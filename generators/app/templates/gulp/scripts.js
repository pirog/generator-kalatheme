'use strict';
var browserify = require('gulp-browserify'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  pkg = require('../package.json'),
  paths = require('./paths'),
  sourcemaps = require('gulp-sourcemaps');

module.exports = function (gulp) {
  gulp.task('scripts', function () {
    gulp.src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(browserify({
      shim: {
        bootstrap: {
          path: 'bower_components/bootstrap/dist/js/bootstrap.js',
          exports: 'jQuery'
        }
      }
    }))
    .pipe(rename(pkg.name + '.js'))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min.'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.scripts.dest));
  });

  return gulp;
};
