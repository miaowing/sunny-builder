import test from 'ava';
import path from 'path';
import del from 'del';

import lib from '../../lib';

test('assert lib', async t => {
    try {
        del.sync([path.join(__dirname, 'node_modules'), path.join(__dirname, 'build')]);
        await lib.initEnv(__dirname);
        await lib.execCommand('build', path.resolve(__dirname));
        t.pass();
    } catch (err) {
        t.fail(err);
    }
});
test.after('assert lib', async t => {
    del.sync([path.join(__dirname, 'node_modules'), path.join(__dirname, 'build')]);
});
