import test from 'ava';
import path from 'path';
import _ from 'lodash';

import init from '../../lib/init';
import configManager from '../../lib/config';

test('assert init.installDeps()', async t => {
    init.installDeps(configManager.getDeps(path.resolve(__dirname, 'sun.config.js')))
        .then(() => {
            t.pass();
        })
        .catch((err) => {
            t.fail(err);
        });
});
