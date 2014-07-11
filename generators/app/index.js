'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var KalathemeGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

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
      type: 'confirm',
      name: 'sass',
      message: 'Do you want to use SASS?',
      default: true
    },{
      type: 'confirm',
      name: 'coffeescript',
      message: 'Do you want to use CoffeeScript? (If not, we will give you vanilla JS.)',
      default: true
    },{
      type: 'checkbox',
      name: 'bower',
      message: 'Select bower components you want to include:',
      choices: [
        {
          name: 'bootstrap-sass-official'
        },{
          name: 'modernizr'
        },{
          name: 'fontawesome'
        },{
          name: 'respondJS'
        },{
          name: 'yepnope'
        }
      ],
      default: this.choices
    }];

    this.prompt(prompts, function (props) {
      this.humanName = props.humanName;
      this.name = props.name;
      this.sass = props.sass;
      this.coffeescript = props.coffeescript;
      this.bower = props.bower;


      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('app');
    this.mkdir('app/templates');

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = KalathemeGenerator;
