'use strict';
// var util = require('util');
// var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
// var chalk = require('chalk');

var appNameValidation = require('./appNameValidation');

var KalathemeGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Kalatheme generator!'));

    var prompts = [{
      type: 'input',
      name: 'humanName',
      message: 'What would to call your subtheme? (Human readable name)',
      default:  _.humanize(this.appname)
    }, {
      type: 'input',
      name: 'name',
      message: 'What is the machine name of your subtheme?',
      default: this.appname,
      validate: appNameValidation(input),
      filter: function () {
        [^a-z0-9]+
      }
    }, {
      type: 'input',
      name: 'description',
      message: 'Subtheme description:',
      default: 'An aweseome theme powered by kalatheme and yeoman!'
    }, {
      type: 'list',
      name: 'css',
      message: 'In what format would you like the use for stylesheets?',
      choices: ['sass', 'less', 'stylus', 'css'],
      default: 'sass'
    }, {
      type: 'confirm',
      name: 'coffeescript',
      message: 'Do you want to use CoffeeScript? (If not, we will give you vanilla JS.)',
      default: true
    }, {
      type: 'confirm',
      name: 'browserify',
      message: 'Do you want to use CommonJS style modules with browserify?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      // Sets the generator properties.
      this.humanName = props.humanName;
      this.appname = props.name;
      this.css = props.css;
      this.description = props.description;
      this.coffeescript = props.coffeescript;
      this.browserify = props.browserify;
      done();
    }.bind(this));
  },
  /**
   * Scaffold out the common components.
   */
  app: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('gitignore', '.gitignore');
    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.directory('dist', 'dist');
  },

  /**
   * Scaffold out the styles for the subtheme.
   */
  styles: function () {
    this.composeWith('bootstrap:app', {
      options: {
        format: this.css
      }
    });
    if (this.css === 'sass') {
      this.directory('scss', 'scss');
    }
  },

  /**
   * Scaffold out the theme's javascript assets.
   */
  scripts: function () {
    this.mkdir('scripts');
    // Generic file extension.
    var ext = this.coffeescript ? 'coffee' : 'js';
    if (this.browserify) {
      this.template('scripts/_index.' + ext, 'scripts/index.' + ext);
    }
    else {
      this.template('script/_vanilla' + ext, 'script/' + this._.this.appname  + ext);
    }
  },
  /**
   * PHP related build tasks.
   */
  php: function () {
    this.directory('templates', 'templates');
    this.template('_template.php', 'template.php');
    this.template('_subtheme.info', this.appname + '.info');
  }
});


module.exports = KalathemeGenerator;
