var util = require('util'),
    webpack = require('webpack'),
    _ = require('lodash'),
    UglifyJSPlugin = require('uglifyjs-webpack-plugin');

var WebpackConfig = require('./WebpackConfig'),
    urlUtil = require('../util/urlUtil');

function DistWebpackConfig(media, defConfig, config) {
    WebpackConfig.call(this, media, defConfig, config);
    this.mediaConfig = config[media];
    if (!this.mediaConfig) {
        throw new Error('no' + media + 'config in the config file');
    }
    if (this.mediaConfig.publicPath) {
        this.handledConfig.output.publicPath = urlUtil.appendSlash(this.mediaConfig.publicPath);
    }
    this.handledConfig.plugins.push(new UglifyJSPlugin());
}
util.inherits(DistWebpackConfig, WebpackConfig);

module.exports = DistWebpackConfig;
