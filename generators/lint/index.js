'use strict';
var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    initializing () {
        this.fs.copyTpl(
            this.templatePath('.eslintignore'),
            this.destinationPath('.eslintignore')
        );

        this.fs.copyTpl(
            this.templatePath('.eslintrc'),
            this.destinationPath('.eslintrc')
        );
    }
};
