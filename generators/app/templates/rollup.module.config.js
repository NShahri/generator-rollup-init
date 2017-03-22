/* global require*/

import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

let pkg = require('./package.json');

export default {
    entry: '<%= entry %>',
    plugins: [
        babel({
            babelrc: false,
            exclude: 'node_modules/**',
            runtimeHelpers: true,
            presets: [
              [ 'es2015', { modules: false } ],
              [ 'react' ],
              [ 'stage-0' ]
            ],
            plugins: [
                'transform-flow-strip-types',
                'external-helpers'
            ]
        }),
        commonjs({
            namedExports: {
                'node_modules/react/react.js': ['PropTypes', 'createElement']
            },            
            exclude: ['node_modules/moment/**']
        }),
        nodeResolve({
            module: true,
            main: true
        })
    ],
    targets: [
        {
            dest: pkg['module'],
            format: 'es',
            moduleName: pkg.name,
            sourceMap: true
        }
    ]
};