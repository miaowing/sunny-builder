var fs = require('graceful-fs'),
    path = require('path');

var command = require('./command'),
    Scene = require('./Scene'),
    init = require('./init'),
    compiler = require('./compile'),
    clear = require('./clear'),
    scene = null;

exports.initCommand = function (version, processArgv) {
    command(version, processArgv);
};
exports.initEnv = function (baseDir) {
    var scene = getScene(baseDir);
    return init.installDeps(scene.getDepsConfig());
};
exports.execCommand = function (mediaName, baseDir) {
    var scene = getScene(baseDir);
    scene.setMedia(mediaName);
    scene.init();
    clear.clearFiles(path.join(scene.baseDir, scene.config.releaseDir));
    return compiler.compile(scene.media, scene.config);
};
exports.getScene = getScene;

function getScene(baseDir) {
    if (!scene) {
        scene = new Scene();
        scene.setBaseDir(baseDir);
    }
    return scene;
}
