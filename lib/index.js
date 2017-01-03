var fs = require('graceful-fs'),
    path = require('path');

var command = require('./command'),
    configManager = require('./config');

var configName = 'sun.config.js';


exports.initCommand = function (version, processArgv) {
    command(version, processArgv);
};
exports.execCommand = function (mediaName, baseDir) {
    baseDir = baseDir || process.env.PWD;
    var configPath = path.join(baseDir, configName);
    if (!fs.existsSync(configPath)) {
        throw new Error('There is no file called ' + configName);
    }
    var config = configManager.getConfig(mediaName, configPath);
};
