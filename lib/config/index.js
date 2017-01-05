var webpack = require('webpack'),
    _ = require('lodash');


var defaultDeps = require('./defaultDeps.json'),
    defaultConfig = require('./defaultConfig'),
    handlePageMap = require('./handlePageMap'),
    handleExtract = require('./handleExtract'),
    handleOutput = require('./handleOutput'),
    getWebpackConfig = require('./getWebpackConfig');

module.exports = {
    getConfig: function (media, path) {
        var customConfig = require(path),
            // dev,build,dist config
            handledWebpackConfig = {},
            handledConfig = {};

        // default config
        _.assign(handledConfig, defaultConfig, customConfig);

        // get Webpack config
        handledWebpackConfig = getWebpackConfig(media, handledConfig);
        handledConfig['webpack'] = handledWebpackConfig;

        // handle pageMap
        handlePageMap(handledConfig);

        // handle path
        handleOutput(handledConfig);

        // handle extract css plugin
        handleExtract(handledConfig);

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
