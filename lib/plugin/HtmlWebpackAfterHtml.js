var fs = require('graceful-fs'),
    path = require('path'),
    _ = require('lodash'),
    mkdirp = require('mkdirp'),
    Promise = require('bluebird');

var templateRegx = /.+[\/\\]loader\.js!(.+)/i,
    defOpt = {
        desDir: 'build'
    };


function HtmlWebpackAfterHtml(option) {
    this.option = _.assign({}, defOpt, option);
}

HtmlWebpackAfterHtml.prototype.apply = function (compiler) {
    var self = this;
    compiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-after-html-processing', function (htmlPluginData, callback) {
            var templatePath = null;
            if (!_.has(htmlPluginData, 'plugin.options.template')) {
                callback(null, htmlPluginData);
                return;
            }
            handle(htmlPluginData.plugin.options.template, htmlPluginData.html)
                .then(function () {
                    callback(null, htmlPluginData);
                });
        });
        compilation.plugin('html-webpack-plugin-alter-asset-tags', function (context, callback) {
            // 存在injectMap
            var injectMap = context.plugin.options.injectMap;
            if (injectMap && injectMap.head) {
                var headFiles = injectMap.head;
                var headChunks = _.filter(context.chunks, function (chunk) {
                    return _.intersection(chunk.names, headFiles).length;
                });
                // 选出应该放置在头部的标签
                var headTags = _.filter(context.body, function (tag) {
                    return _.some(headChunks, function (chunk) {
                        return _.some(chunk.names, function (name) {
                            return tag.attributes.src.indexOf(name) != -1;
                        });
                    });
                });
                context.head = context.head.concat(headTags);
                context.body = _.xor(headTags, context.body);
                return callback(null, context);
            }
            context.head.forEach(function (tag) {
                if (tag.tagName === 'link' || tag.tagName === 'script') {
                    tag.attributes['inline'] = true;
                }
            });
            callback(null, context);
        });
    });

    /**
     * 处理webpack处理过的html内容,生成后端模板
     * @param desPath
     * @param html
     */
    function handle(desPath, html) {
        return new Promise(function (resolve, reject) {
            if (!desPath) return reject('no template path');
            var matches = templateRegx.exec(desPath);
            if (!matches || matches.length < 2) {
                return reject('invalid template path');
            }
            // 替换源文件夹,输出到后端模板build位置
            desPath = matches[1].replace('src', self.option.desDir);
            var dirPath = path.dirname(desPath);
            mkdirp(dirPath, function (err) {
                if (err) throw err;
                var ws = fs.createWriteStream(desPath, {
                    flags: 'w',
                    defaultEncoding: 'utf8'
                });
                ws.write(new Buffer(html));
                resolve({});
            });
        });
    }
};

module.exports = HtmlWebpackAfterHtml;