import test from 'ava';
import path from 'path';
import _ from 'lodash';

import defaultWebpackConfig from '../../lib/config/defaultWebpackConfig';
import defaultConfig from '../../lib/config/defaultConfig';
import WebpackConfig from '../../lib/class/WebpackConfig';
import WebpackConfigFactory from '../../lib/class/WebpackConfigFactory';

let demoConfig = {
    webpack: {
        entry: {
            app: ['./src/static/app.js']
        },
        output: {
            path: path.join(__dirname, 'build'),
            filename: "[name]_[hash].js"
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    loader: "babel-loader",
                    query: {
                        compact: false,
                        presets: ['es2015', 'stage-0', 'react'],
                        plugins: ['add-module-exports']
                    }
                },
                {
                    test: /\.ttf$/,
                    loader: 'url-loader'
                },
            ]
        },
    },
    dev: {
        webpackServerPort: 8082,
        staticServer: 'http://localhost:' + 8082,
    },
    build: {
        publicPath: 'http://build.example.com'
    },
    dist: {
        publicPath: 'http://dist.example.com'
    }
};
demoConfig = Object.assign({}, defaultConfig, demoConfig);

test('assert WebpackConfig constructor()', async t => {
    let w = new WebpackConfig('build', defaultWebpackConfig, demoConfig),
        wConfig = w.getConfig();
    t.is(wConfig.module.rules.length, 6);
});

test('assert WebpackConfigFactory.getConfig()', async t => {
    let devConfig = WebpackConfigFactory.getWebpackConfig('dev', defaultWebpackConfig, demoConfig);
    t.not(devConfig, null);
    t.not(devConfig.mediaConfig, null);
    let buildConfig = WebpackConfigFactory.getWebpackConfig('build', defaultWebpackConfig, demoConfig);
    t.not(buildConfig, null);
    t.not(buildConfig.mediaConfig, null);
    let distConfig = WebpackConfigFactory.getWebpackConfig('dist', defaultWebpackConfig, demoConfig);
    t.not(distConfig, null);
    t.not(distConfig.mediaConfig, null);
});

test('assert plugins', async t => {
    let devConfig = WebpackConfigFactory.getWebpackConfig('dev', defaultWebpackConfig, demoConfig);
    t.is(Array.isArray(devConfig.plugins), true);
});

test('assert publicPath', async t => {
    let devConfig = WebpackConfigFactory.getWebpackConfig('dev', defaultWebpackConfig, demoConfig),
        buildConfig = WebpackConfigFactory.getWebpackConfig('build', defaultWebpackConfig, demoConfig),
        distConfig = WebpackConfigFactory.getWebpackConfig('dist', defaultWebpackConfig, demoConfig);
    t.is(devConfig.output.publicPath, 'http://localhost:8082/');
    t.is(buildConfig.output.publicPath, 'http://build.example.com/');
    t.is(distConfig.output.publicPath, 'http://dist.example.com/');
});
