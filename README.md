# __Webpack-preset__

## 1. 提升开发体验

- 使用__Source Map__ 让开发或上线时代码报错能有更加准确的错误提示。
- 使用Babel翻译js新语法，简化代码。
- 使用Eslint进行语法检查，使代码更规范。

## 2. 提升webpack打包构建速度

- 使用HotModuleRepalcement让打包时只重新编译打包更新变化的代码，不变的代码使用缓存，从而使更新速度更快。
- 使用OneOf让资源文件一旦被某个loader处理就跳出遍历。
- 使用Include/Exclude排除不需要处理的文件。
- 使用Cache对eslint和babel处理结果进行缓存，让二次打包速度更快。
- 使用Thead多进程处理eslint和babel任务。

## 3. 减少代码体积

- 使用TreeShaking剔除冗余代码。
- 使用@babel/plugin-transform-runtime插件对babel进行处理，抽取辅助代码。
- 使用Image Minimizer 对项目中图片进行压缩。

## 4. 优化代码运行性能

- 使用Code Split对代码进行分割，减小单个js体积，并行加载js速度更快，并使用import()动态引入实现按需加载。
- 使用Preload/Prefetch对代码进行预加载。
- 使用Network Cache对输出文件进行更好命名，方便缓存。
- 使用Core-Js对就是进行兼容性处理，提高兼容性。
- 使用PWA让代码可以离线访问。

---

### 1. 图片压缩库
> "image-minimizer-webpack-plugin": "^3.6.1",
    "imagemin": "^8.0.1",
    "imagemin-gifsicle": "^7.0.0",
    "imagemin-jpegtran": "^7.0.0",
    "imagemin-optipng": "^8.0.0",
    "imagemin-svgo": "^10.0.1",