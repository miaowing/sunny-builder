var ExtractTextPlugin = require('extract-text-webpack-plugin'),
    path = require('path');

module.exports = function (config) {
    var wConfig = config['webpack'];
    wConfig.plugins.push(new ExtractTextPlugin(path.join(config.styleDir, '[name]_[contenthash].extract.css')));
    return config;
};
