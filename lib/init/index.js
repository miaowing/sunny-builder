var Promise = require('bluebird');
var install = require('npm-install-package');

exports.installDeps = function (depsConfig) {
    return new Promise(function (resolve, reject) {
        install(depsConfig.deps, {cache: true}, function (err) {
            if (err) {
                return reject(err);
            }
            resolve({});
        })
    })
        .then(function () {
            return new Promise(function (resolve, reject) {
                install(depsConfig.devDeps, {saveDev: true, cache: true}, function (err) {
                    if (err) {
                        return reject(err);
                    }
                    resolve({});
                });
            });
        })
};