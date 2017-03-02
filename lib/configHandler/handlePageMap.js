var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = function (config) {
    if (!config.pageMap || !Array.isArray(config.pageMap)) {
        return config;
    }
    var wConfig = config['webpack'];
    wConfig.plugins = wConfig.plugins.concat(config.pageMap.map(function (page) {
        return new HtmlWebpackPlugin(page);
    }));
    return config;
};
