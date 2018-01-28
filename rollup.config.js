import path from 'path';
import alias from 'rollup-plugin-alias';
import vue from 'rollup-plugin-vue';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import replace from 'rollup-plugin-replace';
import tslint from 'rollup-plugin-tslint';
import typescript from 'rollup-plugin-typescript';
import { tsconfig } from "./tsconfig.json";
import { tslintConfig } from "./tslint.json";

let plugins = [
    alias({
        '@': path.resolve('./src/'),
        resolve: ['.js', '.ts', '.vue']
    }),
    vue({
        compileTemplate: true,
        css: './dist/index.css',
        typescript: tsconfig
    }),
    nodeResolve({
        jsnext: true,
        main: true,
        browser: true
    }),
    commonjs(),
    tslint(Object.assign({exclude: ['node_modules/**', 'src/**/*.vue']}, tslintConfig)),
    typescript({
        typescript: require('typescript')
    })
];

let config = {
    input: './src/index.ts',
    output: {
        name: 'vink',
        file: './dist/index.js',
        format: 'umd',
        sourcemap: true
    },
    external: [
        'vue'
    ],
    plugins: plugins
};

const isProduction = process.env.NODE_ENV === `production`;
const isDevelopment = process.env.NODE_ENV === `development`;

if (isProduction) {
    config.output.sourcemap = false;
    config.plugins.push(
        replace({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    );
    config.plugins.push(uglify());
}

if (isDevelopment) {
    config.plugins.push(
        replace({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    );
    config.plugins.push(livereload());
    config.plugins.push(
        serve({
            contentBase: './dist/',
            port: 8080,
            open: true
        })
    );
}

export default config;