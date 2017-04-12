'use strict';
var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    initializing () {
        this.fs.copyTpl(
            this.templatePath('.flowconfig'),
            this.destinationPath('.flowconfig')
        );
    }

    install() {
        this.npmInstall([
            'flow-bin'
        ], {
            'save-dev': true
        });
    }
};
