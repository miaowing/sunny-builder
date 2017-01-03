var del = require('del'),
    _ = require('lodash');

exports.clearFiles = function () {
    del.sync.apply(del, _.toArray(arguments));
};