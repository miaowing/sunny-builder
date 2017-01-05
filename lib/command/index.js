var program = require('commander');

var lib = require('../');

module.exports = function (version, processArgv) {
    program.version(version);
    program.command('init')
        .action(function (cmd) {
            lib.initEnv();
        });
    program.command('dev')
        .action(function (cmd) {
            lib.execCommand('dev');
        });
    program.command('build')
        .action(function (cmd) {
            lib.execCommand('build');
        });
    program.command('dist')
        .action(function (cmd) {
            lib.execCommand('dist');
        });
    program.parse(processArgv);
};
