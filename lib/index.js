var fs = require('graceful-fs'),
    path = require('path');

var command = require('./command'),
    Scene = require('./Scene'),
    init = require('./init'),
    compiler = require('./compile'),
    suffixProcessor = require('./suffixprocessor'),
    clear = require('./clear'),
    scene = null;

exports.initCommand = function (version, processArgv) {
    command(version, processArgv);
};
exports.initEnv = function (baseDir) {
    var scene = getScene(baseDir);
    return init.installDeps(scene.getDepsConfig());
};
exports.execCommand = function (mediaName) {
    var scene = getScene();
    scene.setMedia(mediaName);
    scene.init();
    clear.clearFiles(path.join(scene.baseDir, scene.config.releaseDir));
    return compiler.compile(scene.media, scene.config)
        .then(function () {
            return suffixProcessor.runShell(scene.media, scene.config);
        });
};
exports.getScene = getScene;

function getScene(baseDir) {
    if (!scene) {
        scene = new Scene('build', baseDir);
    }
    return scene;
}
