/* global require process*/

import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';

let pkg = require('./package.json');

export default {
    entry: 'lib/js/index.js',
    plugins: [
        babel({
            babelrc: false,
            exclude: 'node_modules/**',
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
            ignoreGlobal: true
        }),
        //globals(),
        replace({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }),
        nodeResolve({
            jsnext: true,
            main: true
        })
    ],
    targets: [
        {
            dest: pkg['main'],
            format: 'umd',
            moduleName: 'React.RT',
            sourceMap: true,
        },
        {
            dest: pkg['jsnext:main'],
            format: 'es',
            moduleName: 'React.RT',
            sourceMap: true
        }
    ]
};