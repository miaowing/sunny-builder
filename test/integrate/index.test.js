import test from 'ava';
import path from 'path';
import del from 'del';

import lib from '../../lib';

test('assert lib', async t => {
    try {
        await lib.initEnv(__dirname);
        await lib.execCommand('build', path.resolve(__dirname));
        t.pass();
    } catch (err) {
        del.sync(path.join(__dirname, 'node_modules'));
        t.fail(err);
    }
});
