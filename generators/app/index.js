'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var prompts = require('./prompts');


module.exports = Generator.extend({
  initializing(){
    this.composeWith('license', {name: 'My name', email: 'My@email.com', website: 'www.h.com', defaultLicense: 'MIT'});
  },

  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the stellar ' + chalk.red('generator-rollup-init') + ' generator!'
    ));

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.log(props);
      props.description = '';
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('*'),
      this.destinationPath(),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('.*'),
      this.destinationPath(),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('.vscode/*'),
      this.destinationPath('.vscode/'),
      this.props
    );
  },

  install: function () {
    this.installDependencies();
  }
});
