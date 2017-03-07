var util = require('util'),
    webpack = require('webpack'),
    _ = require('lodash');

var WebpackConfig = require('./WebpackConfig'),
    urlUtil = require('../util/urlUtil');

function DevWebpackConfig(media, defConfig, config) {
    WebpackConfig.call(this, media, defConfig, config);
    this.mediaConfig = config[media];
    var self = this;
    if (!this.mediaConfig) {
        throw new Error('no' + media + 'config in the config file');
    }
    this.handledConfig.devtool = 'inline-source-map';
    this.handledConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
    // add webpack-dev-server config
    _.forEach(this.handledConfig.entry, function (entry) {
        entry.unshift('webpack-dev-server/client?http://localhost:' + self.mediaConfig.webpackServerPort + '/', 'webpack/hot/dev-server');
    });

    // replace output publicPath
    this.handledConfig.output.publicPath = urlUtil.appendSlash('http://localhost:' + this.mediaConfig.webpackServerPort);
}
util.inherits(DevWebpackConfig, WebpackConfig);

module.exports = DevWebpackConfig;


