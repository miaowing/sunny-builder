var _ = require('lodash');

exports.appendSlash = function (str) {
    if (!_.endsWith(str, '/')) {
        str += '/';
    }
    return str;
};
