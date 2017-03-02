var path = require('path');

module.exports = function (config) {
    var wConfig = config['webpack'];
    wConfig.module.rules.push({
        test: /\.(png|gif|jpg|jpeg)$/,
        loader: "url-loader",
        query: {
            limit: "10000",
            name: path.join(config.assetsDir, 'image/[name]-[hash:6].[ext]')
        }
    });
    return config;
};
