var path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
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
        },
        module: {
            loaders: [
                {
                    test: /\.(js|jsx)$/,
                    loader: "babel",
                    query: {
                        compact: false,
                        presets: ['es2015', 'stage-0'],
                        plugins: ['add-module-exports']
                    }
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
        },
        plugins: [
            new HtmlWebpackPlugin({
                chunks: ['app'],
                template: 'test/integrate/src/index.html',
                filename: 'index.html'
            })
        ]
    },
    dev: {
        webpackServerPort: 8081,
        staticServer: 'http://localhost:' + 8081,
    },
    releaseDir: 'build',
    build: {},
    dist: {},
    deps: [
        'jquery'
    ],
    devDeps: [
        'webpack'
    ]
};
