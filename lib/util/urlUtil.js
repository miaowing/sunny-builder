var _ = require('lodash');

exports.appendSlash = function (str) {
    if (!str.endsWith('/')) {
        str += '/';
    }
    return str;
};
