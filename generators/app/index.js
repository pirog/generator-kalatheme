'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


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
      default: this.appname
    },{
      type: 'input',
      name: 'name',
      message: 'What is the machine name of your subtheme?',
      default: this.appname
      // validate: machineNameValidate()
    },{
      type: 'list',
      name: 'css',
      message: 'In what format would you like the use for stylesheets?',
      choices: ['sass', 'less', 'stylus', 'css'],
      default: 'sass'
    },{
      type: 'confirm',
      name: 'coffeescript',
      message: 'Do you want to use CoffeeScript? (If not, we will give you vanilla JS.)',
      default: true
    }];

    this.prompt(prompts, function (props) {
      // Sets this
      this.humanName = props.humanName;
      this.appname = props.name;
      this.css = props.css;
      this.coffeescript = props.coffeescript;
      this.bower = props.bower;

      this.config.save(props);
      done();
    }.bind(this));
  },

  app: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.composeWith('bootstrap:app',{
      options: {
        format: this.css
      }
    });
    if (this.css === 'sass') {
      this.directory('scss','scss')
    }
    this.copy('_template.php', 'template.php')
  }
});

module.exports = KalathemeGenerator;
