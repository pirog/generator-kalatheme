/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('kalatheme generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }
      // Create the apps dependents.
      var deps = [
        '../../generators/app',
        [helpers.createDummyGenerator(), 'bootstrap:app']
      ];

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
      'scripts/index.coffee',
      'scss/main.scss'
    ];

    helpers.mockPrompt(this.app, {
      'humanName': 'My Awesome Theme',
      'name': 'my_awesome_theme',
      'description': 'An awesome theme!',
      'css' : 'sass',
      'coffeescript': true,
      'browserify': true
    });

    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});
