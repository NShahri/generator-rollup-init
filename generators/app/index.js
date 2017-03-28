'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var prompts = require('./prompts');
var path = require('path');
const extend = require('deep-extend');

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

    default() {
        //this.composeWith(require.resolve('generator-node'), {});
        this.composeWith(require.resolve('generator-license'), {name: this.props.name, email: this.props.authorEmail, website: this.props.authorUrl});
        this.composeWith(require.resolve('generator-node/generators/editorconfig'), this.props);
        this.composeWith(require.resolve('generator-node/generators/git'), this.props);
        this.composeWith(require.resolve('generator-node/generators/readme'), this.props);
        // this.composeWith(require.resolve('generator-license/app'), {
        //     name: this.props.authorName,
        //     email: this.props.authorEmail,
        //     website: this.props.authorUrl
        // });
        //     babel: false,
        //     boilerplate: false,
        //     travis: false,
        //     includeCoveralls: false,
        //     coveralls: false,
        //     cli: false,
        //     name: this.props.name,
        //     projectRoot: this.props.entryPath,
        //     skipInstall: true,
        //     //readme: "nima - readme"
        // })
    },

    writing: function () {
        // this.fs.copyTpl(
        //     this.templatePath('.babelrc'),
        //     this.destinationPath(),
        //     this.props
        // );

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
                    'prebuild:bundle': 'npm-run-all lint test',

                    'build:module': 'cross-env NODE_ENV=production rollup -c rollup.module.config.js',
                    'prebuild:module': 'npm-run-all lint test',

                    watch: 'cross-env NODE_ENV=production rollup -c -w rollup.module.config.js',
                    start: 'npm-run-all --parallel watch',

                    lint: 'cd'
                }
        }, pkg);
        this.fs.writeJSON(this.destinationPath('package.json'), newPkg);

    },

    install: function () {
        this.npmInstall([
            'babel-plugin-external-helpers',
            'babel-plugin-transform-flow-strip-types',
            'babel-preset-es2015',
            'babel-preset-react',
            'babel-preset-stage-0',
            'babel-standalone',
            'chai',
            'cross-env',
            'mocha',
            'npm-run-all',
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
});
