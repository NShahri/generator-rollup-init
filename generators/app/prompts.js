var path = require("path");
const gitc = require('git-config').sync();

module.exports = [
	{
        name: 'author',
        message: 'What\'s your name:',
		default: (gitc.user || {}).name
      },
      {
        name: 'email',
        message: 'Your email (optional):',
		default: (gitc.user || {}).email
      },
      {
        name: 'website',
        message: 'Your website (optional):'
      },

	{
		message: 'What is the project name?',
		name: 'name',
		type: 'input',
		default: process.cwd().split(path.sep).pop()
	},
	{
		message: 'Where is the project entry file?',
		help: `Your bundle is generated from the entry file – all its dependencies will be included, along with their dependencies, and so on. The entry file's exports become the bundle's exports.`,
		name: 'entry',
		type: 'input',
		default: 'src/index.js'
	},

	{
		message: 'Generate a UMD build?',
		help: `Universal Module Definition allows your bundle to run in browsers and in Node.js, and to work with AMD module loaders`,
		name: 'umd',
		type: 'confirm',
		default: true
	},

	{
		when ( results ) {
			return results.umd === true;
		},
		message: `Place to write UMD file`,
		name: 'umdFile',
		type: 'input',
		default (results) {
			return `dist/${results.name}.umd.js`;
		}
	},

	{
		when(results){
			return !results.umd;
		},
		message: 'Generate a CommonJS build?',
		help: `CommonJS allows your bundle to run in Node.js`,
		name: 'cjs',
		type: 'confirm',
		default: true
	},

	{
		when ( results ) {
			return results.cjs === true;
		},
		message: `Place to write CommonJS file`,
		name: 'commonJsFile',
		type: 'input',
		default (results) {
			return `dist/${results.name}.cjs.js`;
		}
	},

	{
		message: 'Generate an ES module build?',
		help: `Creating an ES module build allows your bundle to be easily used by other people using Rollup and other ES module bundlers`,
		name: 'es',
		type: 'confirm',
		default: true
	},

	{
		when ( results ) {
			return results.es === true;
		},
		message: `Place to write ES module file`,
		name: 'esFile',
		type: 'input',
		default (results) {
			return `dist/${results.name}.es.js`;
		}
	}
];