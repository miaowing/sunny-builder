#!/usr/bin/env node
var packageJson = require('./../package.json'),
    lib = require('./../lib/index');

lib.initCommand(packageJson.version, process.argv);

