var path = require('path');

module.exports = function (config) {
    var wConfig = config['webpack'],
        assetsDir = config.assetsDir || '';
    wConfig.module.rules.push({
        test: /\.(png|gif|jpg|jpeg)$/,
        loader: "url-loader",
        query: {
            limit: "10000",
            name: path.join(assetsDir, '[name]-[hash:6].[ext]')
        }
    });
    return config;
};
