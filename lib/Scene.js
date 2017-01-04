var fs = require('graceful-fs'),
    path = require('path');
var configManager = require('./config');

function Scene(media, baseDir) {
    this.configName = 'sun.config.js';
    this.media = media;
    this.baseDir = baseDir;
    this.config = {};
    if (baseDir) {
        this.updateConfigPath();
    }
}

Scene.prototype.setMedia = function (media) {
    this.media = media;
};
Scene.prototype.setBaseDir = function (baseDir) {
    this.baseDir = baseDir;
    this.updateConfigPath();
};
Scene.prototype.updateConfigPath = function () {
    this.baseDir = this.baseDir || process.cwd();
    this.configPath = path.join(this.baseDir, this.configName);
};
Scene.prototype.getDepsConfig = function () {
    return configManager.getDeps(this.configPath);
};
Scene.prototype.getConfig = function () {
    return configManager.getConfig(this.media, this.configPath);
};

Scene.prototype.init = function () {
    if (!fs.existsSync(this.configPath)) {
        throw new Error('There is no file called ' + this.configName);
    }
    this.config = this.getConfig();
    this.depsConfig = this.getDepsConfig();
};

module.exports = Scene;