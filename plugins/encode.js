const fs = require('fs/promises');
const path = require('path');
const iconv = require("iconv-lite");

let options = {
    dir: '../dist',
    inEncode: 'utf-8',
    outEncode: 'GB2312'
};

function loopReadDir(aimPath) {
    return new Promise(resolve => {
        fs.opendir(aimPath, {}).then(function (result) {
            let file = result.readSync();
            while (file !== null) {
                if (file.isFile()) {
                    let outPath = path.resolve(aimPath, file.name);
                    fs.readFile(outPath, {
                        encoding: options.inEncode
                    }).then(function (res) {
                        let tempFile = res;
                        if (options.outEncode == 'GB2312') tempFile = iconv.encode(tempFile, 'GB2312');
                        fs.writeFile(outPath, tempFile, {
                            encoding: 'binary'
                        });
                    })
                } else loopReadDir(path.resolve(aimPath, file.name)).then(resolve);
                file = result.readSync();
            }
            result.close();
        });
    })
}

class Encode {
    constructor() { }
    apply(compiler) {
        compiler.hooks.afterDone.tap("Encode", (compilation, callback) => {
            loopReadDir(path.resolve(__dirname, options.dir)).then(callback);
        })
    }
}

module.exports = Encode;
