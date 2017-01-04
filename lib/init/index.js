var Promise = require('bluebird');
var install = require('npm-install-package');

exports.installDeps = function (depsConfig) {
    var option = {saveDev: true, cache: true};
    return new Promise(function (resolve, reject) {
        install(depsConfig.deps, option, function (err) {
            if (err) {
                return reject(err);
            }
            resolve({});
        })
    })
        .then(function () {
            return new Promise(function (resolve, reject) {
                install(depsConfig.devDeps, option, function (err) {
                    if (err) {
                        return reject(err);
                    }
                    resolve({});
                });
            });
        })
};