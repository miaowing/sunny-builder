var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: process.cwd(),
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
                query: {
                    compact: false,
                    presets: ['es2015', 'stage-0', 'react'],
                    plugins: ['add-module-exports']
                }
            },
            {
                test: /\.extract\.(css|less)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'postcss-loader',
                        'less-loader'
                    ]
                }),
            },
            {
                test: function (abspath) {
                    return /\.(css|less)$/.test(abspath) && abspath.indexOf('.extract.') == -1;
                },
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "postcss-loader"
                    },
                    {
                        loader: "less-loader"
                    },
                ],
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    plugins: []
};
