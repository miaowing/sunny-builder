var DevWebpackConfig = require('./DevWebpackConfig'),
    BuildWebpackConfig = require('./BuildWebpackConfig'),
    DistWebpackConfig = require('./DistWebpackConfig');

exports.getWebpackConfig = function (media, defWebpackConfig, config) {
    var wConfig = null;
    switch (media) {
        case 'dev':
            wConfig = new DevWebpackConfig(media, defWebpackConfig, config);
            break;
        case 'build':
            wConfig = new BuildWebpackConfig(media, defWebpackConfig, config);
            break;
        case 'dist':
            wConfig = new DistWebpackConfig(media, defWebpackConfig, config);
            break;
    }
    if (!wConfig) {
        throw new Error('invalid media name');
    }
    return wConfig.getConfig();
};