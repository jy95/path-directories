const pathModule = require("path");

// compose function
// Mostly inspired by Lodash flow ; thanks them
function compose(funcs) {
    const length = funcs ? funcs.length : 0;
    return function(...args) {
        let index = 0;
        let result = length ? funcs[index].apply(this, args) : args[0];
        while (++index < length) {
            result = funcs[index].call(this, result)
        }
        return result
    }
}


module.exports = function(fullPathString) {

    return compose(
        [
            // could help with some ref linux path ^^
            (path) => pathModule.normalize(path),
            // split the result and also handles trivial case caused by parsed fct
            (path) => {
                const parts = path.split(/[\\/]/);
                const result = parts.length > 1 ? parts.slice(0, -1) : parts;
                if (result[0] === '') result[0] = '/';
                return result.filter(el => el !== "");
            },
        ]
    )(fullPathString);
};
