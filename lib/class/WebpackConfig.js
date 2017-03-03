var _ = require('lodash'),
    webpack = require('webpack');

var envMap = {
    'dev': 'development',
    'build': 'production',
    'dist': 'production'
};

function WebpackConfig(media, defConfig, config) {
    this.customConfig = _.cloneDeep(config['webpack']) || {};
    this.mediaName = media;
    this.handledConfig = _.mergeWith(_.cloneDeep(defConfig), this.customConfig, mergeWebpackConfigLogic);
    // add default plugin
    this.handledConfig.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(envMap[media])
            }
        })
    );
    if (!this.handledConfig.output.publicPath) {
        this.handledConfig.output.publicPath = '/';
    }
}

WebpackConfig.prototype.getConfig = function () {
    return this.handledConfig;
};

function mergeWebpackConfigLogic(objVal, srcVal, key) {
    if (key === 'rules') {
        var originBabelLoaderIndex = _.findIndex(objVal, {loader: 'babel-loader'}),
            newBabelLoaderIndex = _.findIndex(srcVal, {loader: 'babel-loader'});
        if (originBabelLoaderIndex > -1 && newBabelLoaderIndex > -1) {
            objVal.splice(originBabelLoaderIndex, 1);
        }
        return objVal.concat(srcVal);
    }
    if (key === 'plugins') {
        return objVal.concat(srcVal);
    }
}

module.exports = WebpackConfig;
