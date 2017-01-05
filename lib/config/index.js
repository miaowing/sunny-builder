var webpack = require('webpack'),
    _ = require('lodash'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

var defaultWebpackLoaders = [
        {
            test: /\.(js|jsx)$/,
            loader: "babel",
            query: {
                compact: false,
                presets: ['es2015', 'stage-0'],
                plugins: ['add-module-exports']
            }
        },
        {
            test: /\.extract\.(css|less)$/,
            loader: ExtractTextPlugin.extract('style', 'css!postcss!less')
        },
        {
            test: function (abspath) {
                return /\.(css|less)$/.test(abspath) && abspath.indexOf('.extract.') == -1;
            },
            loader: 'style!css!postcss!less'
        }
    ],
    defaultWebpackPlugins = [
        new ExtractTextPlugin("[name]_[contenthash].extract.css")
    ];

var webpackExtraConfig = {
    'dev': {
        module: {
            loaders: defaultWebpackLoaders
        },
        devtool: '#eval-source-map',
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('development')
                }
            })
        ].concat(defaultWebpackPlugins)
    },
    'build': {
        module: {
            loaders: defaultWebpackLoaders
        },
        plugins: defaultWebpackPlugins
    },
    'dist': {
        module: {
            loaders: defaultWebpackLoaders
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin({}),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            })
        ].concat(defaultWebpackPlugins)
    }
};

module.exports = {
    getConfig: function (media, path) {
        var customConfig = _.cloneDeep(require(path)),
            customWebpackConfig = customConfig.webpack || {},
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

        if (customConfig.pageMap) {
            customWebpackConfig.plugins = customWebpackConfig.plugins.concat(customConfig.pageMap.map(function (page) {
                return new HtmlWebpackPlugin(page);
            }));
        }

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
                return customConfig;
            case 'build':
            case 'dist':
                return customConfig;
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
                'babel-plugin-add-module-exports',
                'babel-polyfill',
                'babel-preset-es2015',
                'babel-preset-stage-0',
                'babel-loader',
                'autoprefixer',
                'style-loader',
                'postcss-loader',
                'less-loader',
                'css-loader',
                'url-loader',
                'file-loader',
                'less',
                'postcss',
                'webpack-dev-server',
            ].concat(devDepsConfig)
        };
    }
};
