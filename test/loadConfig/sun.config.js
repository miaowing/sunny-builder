var path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    webpack: {
        entry: {
            app: ['./test/integrate/src/app.js']
        },
        output: {
            path: path.resolve(__dirname, "build"),
            publicPath: '',
            filename: "[name]_[hash].js"
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
    build: {},
    dist: {},
    deps: [],
    devDeps: []
};
