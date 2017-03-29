'use strict';
var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    initializing () {
        this.fs.copyTpl(
            this.templatePath('.gitattributes'),
            this.destinationPath('.gitattributes')
        );

        this.fs.copyTpl(
            this.templatePath('.gitignore'),
            this.destinationPath('.gitignore')
        );
    }
};