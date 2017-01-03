var path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    webpack: {
        entry: {
            app: ['./src/app.js']
        },
        output: {
            path: path.resolve(__dirname, "build/"),
            publicPath: '/js/',
            filename: "[name]_[hash].js"
        },
        modules: {
            loaders: [
                {
                    test: /\.(js|jsx)$/,
                    loader: "babel",
                    query: {compact: false}
                },
                {
                    test: /\.inline\.(css|less)$/,
                    loader: ExtractTextPlugin.extract('style', 'css!postcss!less')
                },
                {
                    test: function (abspath) {
                        return /\.(css|less)$/.test(abspath) && abspath.indexOf('.inline.') == -1;
                    },
                    loader: 'style!css!postcss!less'
                }
            ]
        }
    },
    dev: {
        webpackServerPort: 8081,
        staticServer: 'http://localhost:' + 8081,
    },
    build: {},
    dist: {},
    deps: [
        'jquery'
    ],
    devDeps: [
        'webpack'
    ]
};
