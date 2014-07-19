/**
 * @file
 * Gruntfile for managing your builds.
 */
/* jshint unused: false */
'use strict';

module.exports = function (grunt) {

  /**
   * Load grunt tasks config from the grunt folder.
   * @https://github.com/firstandthird/load-grunt-config
   */
  require('load-grunt-config')(grunt, {
    init: true, //auto grunt.initConfig
    data: { //data passed into config.  Can use with <%= test %>
      paths: require('./.gruntpaths.json'),
      pkg: require('./package.json'),
      bower: require('./bower.json')
    },
    loadGruntTasks: { //can optionally pass options to load-grunt-tasks.  If you set to false, it will disable auto loading tasks.
        pattern: 'grunt-*',
        config: require('./package.json'),
        scope: 'devDependencies'
    }
  });

};
