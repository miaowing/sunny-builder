var Promise = require('bluebird'),
    shell = require('shelljs');

exports.runShell = function (media, config) {
    var mediaConfig = config[media];
    if (!mediaConfig.shellScript) {
        return Promise.resolve(config);
    }
    return new Promise(function (resolve, reject) {
        var shellScript = mediaConfig.shellScript;
        if (Array.isArray(shellScript)) {
            shellScript = shellScript.join('  ');
        }
        shell.exec(shellScript, function () {
            resolve(config);
        });
    });
};
