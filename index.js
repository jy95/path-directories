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
    // detect the right path module for the provided path string (handles case where you are on Linux and provide a Windows path)
    let isWindowsPath = (fullPathString.indexOf("\\") !== -1);
    let pathModule = (isWindowsPath) ? require("path").win32 : require("path").posix;

    return compose(
        [
            // could help with some ref linux path ^^
            (path) => pathModule.normalize(path),
            // see API : https://nodejs.org/api/path.html#path_path_parse_path
            (path) => pathModule.parse(path).dir,
            // split the result and also handles trivial case caused by parsed fct
            (path) => path.split(pathModule.sep).reduce(
                (accumulator, currentValue, currentIndex) => {
                    // cases when a empty string occurs
                    // if it is on linux and at first position , default set to pathModule Root (for example /foo )
                    if (currentValue.length === 0) {
                        if (currentIndex === 0) {
                            accumulator.push(pathModule.sep)
                        }
                        // else ignore it XD
                    } else {
                        accumulator.push(currentValue)
                    }
                    return accumulator;
                }
            , []),
            //reverseResult
        ]
    )(fullPathString);
};