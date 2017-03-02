import test from 'ava';
import path from 'path';
import _ from 'lodash';

import lib from '../../lib';
import configManager from '../../lib/configManager';


test('assert lib.loadConfig()', async t => {
    let configPath = path.resolve(__dirname, 'sun.config.js');
    let devConfig = configManager.getConfig('dev', configPath),
        buildConfig = configManager.getConfig('build', configPath),
        distConfig = configManager.getConfig('dist', configPath);
    t.is(_.isNil(devConfig), false);
    t.is(_.isNil(buildConfig), false);
    t.is(_.isNil(distConfig), false);
    t.throws(() => {
        configManager.getConfig('none', configPath)
    });
});