/**
 * Main gulp file.
 */
'use strict';
module.exports = function (gulp) {
  var paths = require('./paths'),
      del = require('del');
  /**
   * Load the other tasks.
   */
  require('./styles')(gulp);
  require('./scripts')(gulp);
  require('./watch')(gulp);
  require('./images')(gulp);

  gulp.task('clean', function (cb) {
    return del([paths.build, paths.docs.assets], cb);
  });
  gulp.task('compile', ['styles', 'scripts', 'images']);
  gulp.task('default', ['compile']);
  gulp.task('serve', ['compile', 'watch']);

  return gulp;
};
