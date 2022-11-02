module.exports = {
    presets: [[
        '@babel/preset-env', {
            useBuiltIns: 'usage', //按需加载引入
            corejs: {
                version: 3
            },
            // 指定兼容性做到哪个版本浏览器
            targets: {
                chrome: '60',
                ie: '8' // 等等
            }
        }
    ], "@babel/preset-typescript"]
}