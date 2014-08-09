'use strict';
var paths = require('./paths'),
    imagemin = require('gulp-imagemin'),
    newer = require('gulp-newer');
module.exports  = function (gulp) {
  gulp.task('images', function () {
    gulp.src(paths.images.src)
    .pipe(newer(paths.images.dest))
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest));
  });
};
