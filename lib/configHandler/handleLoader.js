var urlJoin = require('url-join');

module.exports = function (config) {
    var wConfig = config['webpack'],
        assetsDir = config.assetsDir || '';
    wConfig.module.rules.push({
        test: /\.(png|gif|jpg|jpeg)$/,
        loader: "url-loader",
        query: {
            limit: "10000",
            name: urlJoin(assetsDir, '[name]-[hash:6].[ext]')
        }
    });
    return config;
};
