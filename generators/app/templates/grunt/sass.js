// sass.js
/* jshint unused: false */
module.exports = {
  options: {
    includePaths: [
      './bower_components/',
      './node_modules'
    ],
    sourceMap: true,
    imagePath: '<%= paths.build %>/img',
    fonts: '<%= paths.build %>/fonts'
  },
  theme: {
    files: [{
      src: '<%= paths.styles %>/**/*.scss',
      dest: '<%= paths.build %>/css',
      expand: true,
      flatten: true
    }]
  }
};
