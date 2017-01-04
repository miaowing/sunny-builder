var webpack = require('webpack'),
    _ = require('lodash'),
    HtmlWebpackPlugin = require('html-webpack-plugin');


var webpackExtraConfig = {
    'dev': {
        devtool: '#eval-source-map',
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('development')
                }
            })
        ]
    },
    'build': {},
    'dist': {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({}),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            })
        ]
    }
};

module.exports = {
    getConfig: function (media, path) {
        var customConfig = require(path),
            customWebpackConfig = _.cloneDeep(customConfig.webpack) || {},
            mediaConfig = customConfig[media];

        if (!mediaConfig) {
            throw new Error('no' + media + 'config in the config file');
        }
        // 自定义merge逻辑:数组合并
        _.mergeWith(customWebpackConfig, webpackExtraConfig[media], function (objValue, srcValue) {
            if (_.isArray(objValue)) {
                return objValue.concat(srcValue);
            }
        });

        switch (media) {
            case 'dev':
                // add webpack-dev-server config
                _.forEach(customWebpackConfig.entry, function (entry) {
                    entry.unshift('webpack-dev-server/client?http://localhost:' + mediaConfig.webpackServerPort + '/', 'webpack/hot/dev-server');
                });
                // add publicPath,for webpack-dev-server
                _.merge(customWebpackConfig, {
                    output: {
                        publicPath: mediaConfig.staticServer + customWebpackConfig.output.publicPath || '/'
                    }
                });
                return customWebpackConfig;
            case 'build':
            case 'dist':
                return customWebpackConfig;
        }
    },
    getDeps: function (path) {
        var customConfig = require(path),
            depsConfig = customConfig['deps'] || [],
            devDepsConfig = customConfig['devDeps'] || [];
        return {
            deps: [].concat(depsConfig),
            devDeps: [
                'babel-core',
                'babel-loader',
                'babel-plugin-add-module-exports',
                'babel-polyfill',
                'babel-preset-es2015',
                'babel-preset-stage-0'
            ].concat(devDepsConfig)
        };
    }
};
