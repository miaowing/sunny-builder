var _ = require('lodash'),
    webpack = require('webpack');

var defaultWebpackConfig = require('./defaultWebpackConfig');

var envMap = {
    'dev': 'development',
    'build': 'production',
    'dist': 'production'
};
module.exports = function (media, config) {
    var handledWebpack = {},
        mediaConfig = config[media],
        customWebpackConfig = config['webpack'];
    if (!mediaConfig) {
        throw new Error('no' + media + 'config in the config file');
    }

    // merge webpack config
    _.mergeWith(handledWebpack, defaultWebpackConfig, customWebpackConfig, function (objValue, srcValue) {
        if (_.isArray(objValue)) {
            return objValue.concat(srcValue);
        }
    });

    if (!handledWebpack.plugins) {
        handledWebpack.plugins = [];
    }

    // add common plugins
    handledWebpack.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(envMap[media])
            }
        })
    );

    // publicPath
    var originPublicPath = handledWebpack.output.publicPath || '/';

    switch (media) {
        case 'dev':
            handledWebpack.devtool = '#eval-source-map';
            handledWebpack.plugins.push(new webpack.HotModuleReplacementPlugin());
            // add webpack-dev-server config
            _.forEach(handledWebpack.entry, function (entry) {
                entry.unshift('webpack-dev-server/client?http://localhost:' + mediaConfig.webpackServerPort + '/', 'webpack/hot/dev-server');
            });

            // replace output publicPath
            handledWebpack.output.publicPath = mediaConfig.staticServer + '/';
            break;
        case 'build':
            handledWebpack.output.publicPath = mediaConfig.publicPath || originPublicPath;
            break;
        case 'dist':
            handledWebpack.output.publicPath = mediaConfig.publicPath || originPublicPath;
            handledWebpack.plugins.push(new webpack.optimize.UglifyJsPlugin({}));
            break;
    }
    return handledWebpack;
};
