'use strict';

var yeoman = require('yeoman-generator'),
yosay = require('yosay');

var appNameValidation = require('./appNameValidation');

var KalathemeGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../../package.json');

    this.installDevDep = function () {
      if (this.npmDevDep.length < 1) { return; }
      var done = this.async();
      this.npmInstall(this.npmDevDep, {saveDev: true}, done());
    };

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
        this.installDevDep();
      }
    });

    this.sassTask = function() {
      this.copy('grunt/sass.js','grunt/sass.js');
      this.npmDevDep.push('grunt-sass');
    };

  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Kalatheme generator!'));

    var prompts = [{
      type: 'input',
      name: 'humanName',
      message: 'What would to call your subtheme? (Human readable name)',
      default:  this._.humanize(this.appname)
    }, {
      type: 'input',
      name: 'name',
      message: 'What is the machine name of your subtheme?',
      default: this.appname,
      validate: appNameValidation,
      filter: function (input) {
        return input.toLowerCase().replace(/[^a-z0-9]+/,'_').substr(0,32);
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
    },
    /**
     * @todo Adding coffeescript support after initial release.
     */
    // {
    //   type: 'confirm',
    //   name: 'coffeescript',
    //   message: 'Do you want to use CoffeeScript? (If not, we will give you vanilla JS.)',
    //   default: true
    // },
    {
      type: 'confirm',
      name: 'browserify',
      message: 'Do you want to use CommonJS style modules with browserify?',
      default: true
    },{
      type: 'confirm',
      name: 'buildSystem',
      message: 'Do you want to use grunt to help build your theme?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      // Sets the generator properties.
      this.humanName = props.humanName;
      this.appname = props.name;
      this.css = props.css;
      this.description = props.description;
      this.coffeescript = false; // props.coffeescript;
      this.browserify = props.browserify;
      this.buildSystem = props.buildSystem;
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
  },

  gruntfile: function() {
    if (!this.buildSystem) { return; }
    this.npmDevDep = this.npmDevDep ? this.npmDevDep : [];
    this.npmDevDep.push('grunt');
    this.npmDevDep.push('load-grunt-config');
    this.dest.mkdir('grunt');
    this.copy('default-gruntfile.js','Gruntfile.js');
    // Only add for SASS. Others might be supported later.
    if (this.css === 'sass') { this.sassTask(); }




  }
});


module.exports = KalathemeGenerator;
