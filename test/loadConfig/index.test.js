import test from 'ava';
import path from 'path';
import _ from 'lodash';

import lib from '../../lib';
import configManager from '../../lib/config';

test('assert lib.execCommand()', async t => {
    lib.execCommand('dev', path.resolve(__dirname));
});

test('assert lib.loadConfig()', async t => {
    var configPath = path.resolve(__dirname, 'sun.config.js');
    var devConfig = configManager.getConfig('dev', configPath),
        buildConfig = configManager.getConfig('build', configPath),
        distConfig = configManager.getConfig('dist', configPath);
    t.is(_.isNil(devConfig), false);
    t.is(_.isNil(buildConfig), false);
    t.is(_.isNil(distConfig), false);
    t.throws(() => {
        configManager.getConfig('none', configPath)
    });
});