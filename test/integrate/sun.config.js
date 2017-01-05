var path = require('path');

module.exports = {
    webpack: {
        entry: {
            app: ['./test/integrate/src/app.js']
        },
        output: {
            path: path.join(__dirname, 'build'),
            publicPath: ''
        }
    },
    pageMap: [
        {
            chunks: ['app'],
            template: 'test/integrate/src/index.html',
            filename: 'index.html'
        }
    ],
    dev: {
        webpackServerPort: 8081,
        staticServer: 'http://localhost:' + 8081,
    },
    releaseDir: 'build',
    scriptDir: 'js',
    styleDir: 'css',
    build: {},
    dist: {},
    deps: [],
    devDeps: []
};
