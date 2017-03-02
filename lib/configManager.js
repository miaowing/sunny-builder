var webpack = require('webpack'),
    _ = require('lodash');


var defaultDeps = require('./config/defaultDeps'),
    defaultConfig = require('./config/defaultConfig'),
    defaultWebpackConfig = require('./config/defaultWebpackConfig'),
    handlers = [
        require('./configHandler/handlePageMap'),
        require('./configHandler/handleExtract'),
        require('./configHandler/handleOutput'),
        require('./configHandler/handleLoader')
    ],
    WebpackConfigFactory = require('./class/WebpackConfigFactory');

module.exports = {
    getConfig: function (media, path) {
        var customConfig = require(path),
            // dev,build,dist config
            handledWebpackConfig = {},
            handledConfig = {};

        // default config
        _.assign(handledConfig, defaultConfig, customConfig);

        // get Webpack config
        handledWebpackConfig = WebpackConfigFactory.getWebpackConfig(media, defaultWebpackConfig, handledConfig);
        handledConfig['webpack'] = handledWebpackConfig;

        // run handlers
        handledConfig = _.reduce(handlers, function (config, handler) {
            return handler(config);
        }, handledConfig);

        return handledConfig;
    },
    getDeps: function (path) {
        var customConfig = require(path),
            depsConfig = customConfig['deps'] || [],
            devDepsConfig = customConfig['devDeps'] || [];
        return {
            deps: _.get(defaultDeps, 'deps', []).concat(depsConfig),
            devDeps: _.get(defaultDeps, 'devDeps', []).concat(devDepsConfig)
        };
    }
};
