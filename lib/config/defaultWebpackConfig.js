var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
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
                test: /\.extract\.(css|less)$/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss!less')
            },
            {
                test: function (abspath) {
                    return /\.(css|less)$/.test(abspath) && abspath.indexOf('.extract.') == -1;
                },
                loader: 'style!css!postcss!less'
            }
        ]
    }
};
