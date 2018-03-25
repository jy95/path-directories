# path-directories
Get all directories contained in a string file path

## Install

```
$ npm install --save path-dirnames
```

## Usage
```js
const dirnames = require('path-dirnames');
// Windows path - gives [ 'D:', 'DDL', 'ANIME', 'les chevaliers du zodiaques' ]
dirnames("D:\\DDL\\ANIME\\les chevaliers du zodiaques\\whateverFile.avi");
// POSIX path - gives [ 'D:', 'DDL', 'EBOOK' ]
dirnames("D:/DDL/EBOOK/whatEverFile.pub");
```

## API
### path-dirnames(filePath)

Returns all the directories in this string file path.

# License
MIT