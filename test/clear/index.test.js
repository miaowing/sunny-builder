import test from 'ava';
import fs from 'graceful-fs';
import mkdirp from 'mkdirp';
import path from 'path';

import clear from '../../lib/clear';

test('assert clear.clearFiles()', async t => {
    let resPath = path.resolve(__dirname, 'resource');
    mkdirp.sync(resPath);
    let ws1 = fs.createWriteStream(path.join(resPath, 'a.txt'));
    ws1.write('a');
    ws1.end();
    ws1.on('finish', () => {
        t.true(fs.existsSync(path.join(resPath, 'a.txt')));
        clear.clearFiles(path.join(resPath, '**'));
        t.false(fs.existsSync(path.join(resPath, 'a.txt')));
    });
    ws1.on('error', (err) => {
        t.true(_.isNil(err));
    });
});