var Promise = require('bluebird'),
    webpack = require('webpack'),
    WebpackDevServer = require("webpack-dev-server");

exports.compile = function (media, config) {
    var wConfig = config['webpack'],
        compiler = webpack(wConfig);
    switch (media) {
        case 'dev':
            return new Promise(function (resolve, reject) {
                var devConfig = config['dev'],
                    server = new WebpackDevServer(compiler, {
                        hot: true,
                        stats: {colors: true},
                        publicPath: wConfig.output.publicPath
                    });
                compiler.plugin('done', function () {
                    resolve(config);
                });
                server.listen(devConfig.webpackServerPort, "localhost", function () {
                    console.log("Starting static server on http://localhost:" + devConfig.webpackServerPort);
                });
            });
        case 'build':
            return new Promise(function (resolve, reject) {
                compiler.run(function (err, stats) {
                    if (err) {
                        throw err;
                    }
                    console.log(stats.toString({
                        chunks: false,
                        colors: true
                    }));
                    // gutil.log('[webpack:build]', stats.toString({
                    //     chunks: false, // Makes the build much quieter
                    //     colors: true
                    // }));
                    resolve(config);
                });
            });
        case 'dist':
            return new Promise(function (resolve, reject) {
                compiler.run(function (err, stats) {
                    if (err) {
                        throw err;
                    }
                    console.log(stats.toString({
                        chunks: false,
                        colors: true
                    }));
                    // gutil.log('[webpack:dist]', stats.toString({
                    //     chunks: false, // Makes the build much quieter
                    //     colors: true
                    // }));
                    resolve(config);
                });
            });
    }
};
