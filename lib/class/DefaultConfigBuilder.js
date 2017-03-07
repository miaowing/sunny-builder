var _ = require('lodash');

module.exports = function (defaultConfig, customConfig) {
    return _.mergeWith(_.cloneDeep(defaultConfig), customConfig, mergeDefaultConfigLogic);
};

function mergeDefaultConfigLogic(objVal, srcVal, key) {
    if (['dev', 'build', 'index'].indexOf(key) !== -1) {
        return _.assign(objVal, srcVal);
    }
}
