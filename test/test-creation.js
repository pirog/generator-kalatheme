/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var defaultPrompts;
describe('kalatheme generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }
      // Create the apps dependents.
      var deps = [
        '../../generators/app',
        [helpers.createDummyGenerator('bootstrap:app'), 'bootstrap:app']
      ];
      defaultPrompts  = {
        'humanName': 'My Awesome Theme',
        'name': 'my_awesome_theme',
        'description': 'An awesome theme!',
        'css' : 'sass',
        'coffeescript': true,
        'browserify': true,
        'buildSystem': true
      };
      this.app = helpers.createGenerator('kalatheme:app', deps);
      done();
    }.bind(this));
  });
  it('creates expected files', function (done) {
    var expected = [
      // Add files you expect to exist here.
      '.jshintrc',
      '.editorconfig',
      'template.php',
      'bower.json',
      'package.json',
      'my_awesome_theme.info',
      '.gitignore',
      'scripts/index.js',
      'scss/main.scss',
      'dist/README.md',
      'templates/README.md',
      'Gruntfile.js'
    ];

    helpers.mockPrompt(this.app, defaultPrompts);

    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });

  it('creates grunt tasks that can compile bootstrap sass', function(done){

    helpers.mockPrompt(this.app, defaultPrompts);

    this.app.run({}, function () {
      assert.fileContent('Gruntfile.js', /load-grunt-config/);
      helpers.assertFile('./grunt/sass.js');
      helpers.assertFile('./grunt/aliases.js');
      helpers.assertFile('./grunt/browserify.js')
      helpers.assertFile('./grunt/uglify.js')
      done();
    });

  });
});
