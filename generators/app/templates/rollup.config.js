/* global require process*/

import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
//import replace from 'rollup-plugin-replace';

let pkg = require('./package.json');

export default {
    entry: '<%= entry %>',
    external:  Object.keys(pkg.dependencies || {}),
    plugins: [
        babel({
            babelrc: false,
            exclude: 'node_modules/**',
            runtimeHelpers: true,
            presets: [
              [ 'es2015', { modules: false } ],
              [ 'react' ],
              [ 'stage-0' ],
              [ 'flow' ]
            ],
            plugins: [
                'external-helpers'
            ]
        }),
        commonjs({
            // namedExports: {
            //     'node_modules/react/react.js': ['PropTypes', 'createElement']
            // },
            // exclude: ['node_modules/moment/**']
        }),
        //replace({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }),
        nodeResolve({
            module: true,
            jsnext: true,
            main: true,
            preferBuiltins: false
        })
    ],
    targets: [
        {
            dest: pkg['module'],
            format: 'es',
            moduleName: pkg.name,
            sourceMap: true
        },
        {
            dest: pkg['main'],
            format: '<%= format %>',
            moduleName: pkg.name,
            sourceMap: true
        }
    ]
};
