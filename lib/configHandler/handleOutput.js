var path = require('path');

module.exports = function (config) {
    var webpackConfig = config['webpack'];
    if (!webpackConfig.output.path) {
        webpackConfig.output.path = path.join(process.cwd(), config.releaseDir);
    }
    var filename = webpackConfig.output.filename;
    if (!filename) {
        webpackConfig.output.filename = filename = '[name]_[hash].js';
    }
    webpackConfig.output.filename = path.join(config.scriptDir, filename);
    return config;
};
