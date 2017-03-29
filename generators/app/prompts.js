var path = require("path");
const gitc = require('git-config').sync();
var licenses = require('generator-license').licenses;

module.exports = [
    {
        message: 'What is the project name?',
        name: 'name',
        type: 'input',
        when: true,
        default: process.cwd().split(path.sep).pop()
    },
    {
        message: 'Author\'s Name?',
        name: 'authorName',
        type: 'input',
        when: false,
        default: gitc.user.name || 'no-name'
    },
    {
        message: 'Author\'s Email?',
        name: 'authorEmail',
        type: 'input',
        when: false,
        default: gitc.user.email || 'no-email'
    },
    {
        message: 'Author\'s Homepage?',
        name: 'authorUrl',
        type: 'input',
        when: false,
        default: `https://github.com/${gitc.user.name || 'github-user'}`
    },
    {
        message: 'GitHub username or organization?',
        name: 'githubAccount',
        type: 'input',
        when: false,
        default: gitc.github ? gitc.github.user : 'github-username'
    },
    {
        type: 'list',
        name: 'license',
        message: 'Which license do you want to use?',
        choices: licenses,
        when: false,
        default: 'nolicense'
    },    
    {
        message: 'Where is the project entry file?',
        help: `Your bundle is generated from the entry file – all its dependencies will be included, along with their dependencies, and so on. The entry file's exports become the bundle's exports.`,
        name: 'entry',
        type: 'input',
        when: true,
        default: 'src/index.js'
    },
    {
        message: `Place to write ES module file`,
        name: 'esFile',
        type: 'input',
        when: true,
        default (results) {
            return `dist/${results.name}.es.js`;
        }
    },
    {
        message: 'Additional format generated bundle (optional)?',
        name: 'format',
        type: 'list',
        when: true,
        default: 'umd',
        choices: [
            { name: 'umd – Universal Module Definition, works as amd, cjs and iife all in one', value: 'umd', short: 'umd' },
            { name: 'amd – Asynchronous Module Definition, used with module loaders like RequireJS', value: 'amd', short: 'amd' },
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
        },
    },
];
