'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var prompts = require('./prompts');
var path = require('path');

module.exports = Generator.extend({
    prompting: function () {
        this.log(yosay(
            'Welcome to the ' + chalk.red('generator-rollup-init') + ' generator!'
        ));

        return this.prompt(prompts).then(function (props) {
            let entry = path.parse(props.entry);
            props.entryPath = entry.dir;
            props.entryTest = path.resolve(entry.dir, entry.name + '.spec' + entry.ext);
            props.bundleFile = props.bundleFile || '';
            this.props = props;
        }.bind(this));
    },

    writing: function () {
        // this.fs.copyTpl(
        //     this.templatePath('.*'),
        //     this.destinationPath(),
        //     this.props
        // );

        this.fs.copyTpl(
            this.templatePath('*'),
            this.destinationPath(),
            this.props
        );

        this.fs.copyTpl(
            this.templatePath('src/index.js'),
            this.destinationPath(this.props.entry),
            this.props
        );

        this.fs.copyTpl(
            this.templatePath('src/index.spec.js'),
            this.destinationPath(this.props.entryTest),
            this.props
        );
    },

    install: function () {
        this.npmInstall([
            "babel-plugin-external-helpers",
            "babel-plugin-transform-flow-strip-types",
            "babel-preset-es2015",
            "babel-preset-react",
            "babel-preset-stage-0",
            "babel-standalone",
            "chai",
            "cross-env",
            "mocha",
            "npm-run-all",
            "rollup",
            "rollup-plugin-babel",
            "rollup-plugin-commonjs",
            "rollup-plugin-node-resolve",
            "rollup-plugin-replace",
            "rollup-watch"], {
            'save-dev': true
        });

        this.installDependencies({
            npm: true,
            bower: false,
            yarn: false
        });
    }
});
