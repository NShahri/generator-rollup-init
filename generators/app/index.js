'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var prompts = require('./prompts');
var path = require('path');
const extend = require('deep-extend');

module.exports = class extends Generator {
    constructor(args, options) {
        super(args, options);
    }

    prompting() {
        this.log(yosay(
            'Welcome to the ' + chalk.red('generator-rollup-init') + ' generator!'
        ));

        let options = {};
        prompts.forEach(p => options[p.name] = p.default);

        return this.prompt(prompts).then(function (props) {
            let entry = path.parse(props.entry);

            this.props = Object.assign({
                entryPath: entry.dir,
                entryTest: path.resolve(entry.dir, entry.name + '.spec' + entry.ext),
                bundleFile: props.bundleFile || ''
            }, options, props);
        }.bind(this));
    }

    default() {
        this.composeWith(require.resolve('generator-license'), {name: this.props.authorName, email: this.props.authorEmail, website: this.props.authorUrl, license: this.props.license});
        this.composeWith(require.resolve('../editorconfig'));
        this.composeWith(require.resolve('../git'), this.props);
        this.composeWith(require.resolve('../readme'), this.props);
    }

    writing() {
        this.fs.copyTpl(
            this.templatePath('.flowconfig'),
            this.destinationPath('.flowconfig'),
            this.props
        );
        
        this.fs.copyTpl(
            this.templatePath('.babelrc'),
            this.destinationPath('.babelrc'),
            this.props
        );

        this.fs.copyTpl(
            this.templatePath('rollup*'),
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

        const pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
        let newPkg = extend({
                name: this.props.name,
                main: this.props.bundleFile || this.props.esFile,
                module: this.props.esFile,
                version: '0.0.0',
                description: '',
                homepage: this.props.homepage,
                author: {
                    name: this.props.authorName,
                    email: this.props.authorEmail,
                    url: this.props.authorUrl
                },
                scripts: {
                    test: `mocha --compilers js:babel-core/register ${this.props.entryPath}/**/*.spec.js`,

                    'build:bundle': 'cross-env NODE_ENV=production rollup -c rollup.bundle.config.js',
                    'prebuild:bundle': 'npm-run-all lint flow test',
                    'build:module': 'cross-env NODE_ENV=production rollup -c rollup.module.config.js',
                    'prebuild:module': 'npm-run-all lint flow test',
                    build: 'npm-run-all build:bundle build:module',
                    
                    'watch:module': 'cross-env NODE_ENV=production rollup -c -w rollup.module.config.js',
                    'watch:bundle': 'cross-env NODE_ENV=production rollup -c -w rollup.bundle.config.js',
                    watch: 'npm run watch:bundle & npm run watch:module',


                    start: 'npm run watch',

                    flow: 'flow',

                    lint: 'eslint lib/js/**/*.{js,jsx}'
                }
        }, pkg);
        this.fs.writeJSON(this.destinationPath('package.json'), newPkg);

    }

    install() {
        this.npmInstall([
            'babel-plugin-external-helpers',
            'babel-preset-flow',
            'babel-preset-es2015',
            'babel-preset-react',
            'babel-preset-stage-0',
            'babel-standalone',
            'flow-bin', 
            'chai',
            'cross-env',
            'mocha',
            'npm-run-all',
            'eslint',
            'eslint-plugin-flowtype',
            'eslint-plugin-react',
            'rollup',
            'rollup-plugin-babel',
            'rollup-plugin-commonjs',
            'rollup-plugin-node-resolve',
            'rollup-plugin-replace',
            'rollup-watch'], {
            'save-dev': true
        });

        this.installDependencies({
            npm: true,
            bower: false,
            yarn: false
        });
    }
};
