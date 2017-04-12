'use strict';
var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    constructor(args, options) {
        super(args, options);

        this.option('description', {
            type: String,
            required: false,
            defaults: '',
            desc: 'Project description.'
        });

        this.option('name', {
            type: String,
            required: true,
            desc: 'Project name'
        });

        this.option('authorName', {
            type: String,
            required: true,
            desc: 'Author name'
        });

        this.option('authorUrl', {
            type: String,
            required: true,
            desc: 'Author url'
        });

        this.option('license', {
            type: String,
            required: true,
            desc: 'license'
        });
    }

    initializing () {
        this.fs.copyTpl(
            this.templatePath('README.md'),
            this.destinationPath('README.md'),
            this.options
        );
    }
};