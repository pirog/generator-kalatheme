module.exports = {
  build: 'dist',
  css: {
    src: 'scss/**/*.scss',
    dest: 'dist/css',
    includes: ['../node_modules', '../bower_components'],
    csslintrc: '.csslintrc.json'
  },
  scripts: {
    src: 'scripts/index.js',
    dest: 'dist/js',
    watch: 'scripts/**/*.{js}'
  },
  images: {
    src: 'img_src/**/*.{svg, png, jpg, gif}',
    dest: 'dist/img'
  }
};
