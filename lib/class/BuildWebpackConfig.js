var util = require('util'),
    webpack = require('webpack'),
    _ = require('lodash');

var WebpackConfig = require('./WebpackConfig'),
    urlUtil = require('../util/urlUtil');

function BuildWebpackConfig(media, defConfig, config) {
    WebpackConfig.call(this, media, defConfig, config);
    this.mediaConfig = config[media];
    if (!this.mediaConfig) {
        throw new Error('no' + media + 'config in the config file');
    }
    if (this.mediaConfig.publicPath) {
        this.handledConfig.output.publicPath = urlUtil.appendSlash(this.mediaConfig.publicPath);
    }
}
util.inherits(BuildWebpackConfig, WebpackConfig);

module.exports = BuildWebpackConfig;


