let separator = require("path").sep;
let dirname = require("path").dirname;
let normalizer = require("path").normalize;

// function composition
normalizePath = (path) => normalizer(path);
getDirnames = (path) => dirname(path);
splitPaths = (path) => path.split(separator);
//reverseResult = (arrayOfPath) => arrayOfPath.reverse();

// compose function
// Mostly inspired by Lodash flow ; thanks them
function compose(funcs) {
    const length = funcs ? funcs.length : 0;
    return function (...args) {
        let index = 0;
        let result = length ? funcs[index].apply(this, args) : args[0];
        while (++index < length) {
            result = funcs[index].call(this, result)
        }
        return result
    }
}

module.exports = function (fullPathString) {

    return compose(
        [
            normalizePath,
            getDirnames,
            splitPaths,
            //reverseResult
        ]
    )(fullPathString);
};