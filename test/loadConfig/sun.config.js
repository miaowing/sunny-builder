var path = require('path');

module.exports = {
    webpack: {
        entry: {
            app: ['app.js']
        },
        output: {
            path: path.resolve(__dirname, "build/"),
            publicPath: '/js/',
            filename: "[name]_[hash].js"
        },
    },
    dev: {
        webpackServerPort: 8081,
        staticServer: 'http://localhost:' + 8081,
    },
    build: {

    },
    dist: {

    }
};
