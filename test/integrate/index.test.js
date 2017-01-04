import test from 'ava';
import path from 'path';
import del from 'del';

import lib from '../../lib';

test('assert lib.initEnv', async t => {
    try {
        await lib.initEnv(__dirname);
        del.sync(path.join(__dirname, 'node_modules'));
        t.pass();
    } catch (err) {
        t.fail(err);
    }
});
