var path = require("path");
const gitc = require('git-config').sync();

module.exports = [
    {
        message: 'What is the project name?',
        name: 'name',
        type: 'input',
        default: process.cwd().split(path.sep).pop()
    },
    {
        message: 'Author\'s Name?',
        name: 'authorName',
        type: 'input',
        default: gitc.name
    },
    {
        message: 'Author\'s Email?',
        name: 'authorEmail',
        type: 'input',
        default: gitc.email
    },
    {
        message: 'Author\'s Homepage?',
        name: 'authorUrl',
        type: 'input'
    },
    {
        message: 'GitHub username or organization?',
        name: 'githubAccount',
        type: 'input',
        default: gitc.user
    },
    {
        message: 'Where is the project entry file?',
        help: `Your bundle is generated from the entry file – all its dependencies will be included, along with their dependencies, and so on. The entry file's exports become the bundle's exports.`,
        name: 'entry',
        type: 'input',
        default: 'src/index.js'
    },
    {
        message: `Place to write ES module file`,
        name: 'esFile',
        type: 'input',
        default (results) {
            return `dist/${results.name}.es.js`;
        }
    },
    {
        message: 'Additional format generated bundle (optional)?',
        name: 'format',
        type: 'list',
        default: 'umd',
        choices: [
            { name: 'umd – Universal Module Definition, works as amd, cjs and iife all in one', value: 'umd', short: 'umd' },
            { name: 'amd – Asychronous Module Definition, used with module loaders like RequireJS', value: 'amd', short: 'amd' },
            { name: 'cjs – CommonJS, suitable for Node and Browserify/Webpack', value: 'cjs', short: 'cjs' },
            { name: 'iife – A self-executing function, suitable for inclusion as a <script> tag', value: 'iife', short: 'iife' },
            { name: 'only ES', value: '' }
        ]
    },
    {
        when(results){
            return results.format;
        },
        message(results){
            return `Place to write ${results.format} module file`;
        },
        name: 'bundleFile',
        type: 'input',
        default (results) {
            return `${path.dirname(results.esFile)}/${results.name}.${results.format}.js`;
        }
    },
];
