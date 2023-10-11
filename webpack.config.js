const path = require('path');
const os = require('os');
//语法检查插件
const EslintPlugin = require('eslint-webpack-plugin');
//生成html插件
const HtmlWebPackPlugin = require('html-webpack-plugin');
// 额外线程模拟ts类型检查
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
//抽取css文件插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//css压缩插件
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
//js压缩插件
const TerserWebpackPlugin = require('terser-webpack-plugin');
//图片压缩插件
// const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
//启用preload、prefetch插件
// const PreloadWebapckPlugin = require('@vue/preload-webpack-plugin');
//PWA渐进式应用插件
// const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

const threads = os.cpus().length;

function GetCommonOptions(ScriptParams) {
  return {
    entry: {
      main: './src/main.ts',
      app: './src/app.ts'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'static/js/[name].[contenthash:10].js',
      //打包时自动清理输出文件夹
      clean: 'clean' in ScriptParams,
      //为打包输出的其他chunk命名
      chunkFilename: 'static/js/[name].chunk.[contenthash:10].js',
      //为通过type；asset处理的资源统一命名
      assetModuleFilename: 'static/media/[hash:10][ext][query]'
    },
    module: {
      rules: [
        //规则匹配时，只使用第一个匹配规则
        {
          oneOf: [
            {
              test: /\.css|s[ac]ss$/,
              use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'css-unicode-loader',
                {
                  loader: 'postcss-loader',
                  options: {
                    postcssOptions: {
                      plugins: ['postcss-preset-env']
                    }
                  }
                },
                'sass-loader'
              ]
            }, {
              test: /\.js$/,
              //排除node_modules文件夹
              exclude: /node_modules/,
              use: [
                {
                  loader: 'thread-loader',
                  options: {
                    works: threads
                  }
                }, {
                  loader: 'babel-loader',
                  //babel-loader设置缓存
                  options: {
                    cacheDirectory: true,
                    cacheCompression: false,
                    plugins: ['@babel/plugin-transform-runtime'], //不在为每个文件注入runtime，减小代码体积
                  }
                }
              ]
            }, {
              test: /\.ts$/,
              //排除node_modules文件夹
              exclude: /node_modules/,
              use: [
                {
                  loader: 'babel-loader',
                  //babel-loader设置缓存
                  options: {
                    cacheDirectory: true,
                    cacheCompression: false,
                    plugins: ['@babel/plugin-transform-runtime'], //不在为每个文件注入runtime，减小代码体积
                  }
                },
                {
                  loader: 'ts-loader',
                  options: {
                    // 关闭ts类型检查,只做转义
                    transpileOnly: true
                  }
                }
              ]
            }, {
              test: /\.png|jpe?g|gif|webp$/,
              type: 'asset',
              parser: {
                //文件转Base64大小配置
                dataUrlCondition: {
                  maxSize: 100 * 1024
                }
              },
              // generator: {
              //     filename: 'static/imgs/[hash:10][ext]'
              // }
            }, {
              test: /\.ttf|woff2?$/,
              type: 'asset/resource',
              // generator: {
              //     filename: 'static/fonts/[hash:10][ext]'
              // }
            }
          ]
        }
      ]
    },
    optimization: {
      minimize: false,
      //压缩操作
      minimizer: [
        new CssMinimizerWebpackPlugin(),
        new TerserWebpackPlugin({
          parallel: threads, //开启多线程
          terserOptions: {
            compress: {
              // 生产环境去除日志
              drop_console: true,
              // 生产环境去除断点
              drop_debugger: true
            }
          }
        }),
        //图片压缩
        // new ImageMinimizerPlugin({
        //     minimizer: {
        //         implementation: ImageMinimizerPlugin.imageminGenerate,
        //         options: {
        //             plugins: [
        //                 ["gifsicle", { interlaced: true }],
        //                 ["jpegtran", { progressive: true }],
        //                 ["optipng", { optimizationLevel: 5 }],
        //                 ["svgo", {
        //                     plugins: [
        //                         "preset-default",
        //                         "prefixIds",
        //                         {
        //                             name: 'sortAttrs',
        //                             params: {
        //                                 xmlnsOrder: 'alphabetical'
        //                             }
        //                         }
        //                     ]
        //                 }],
        //             ]
        //         }
        //     }
        // })
      ],
      //代码分割
      splitChunks: {
        chunks: "all", //分割所有模块
        minSize: 20000, //分割代码最小大小
        minChunks: 2, //最小引用次数
        maxAsyncRequests: 30, //按需加载时的最大并行请求数。
        maxInitialRequests: 30, //入口点的最大并行请求数。
        enforceSizeThreshold: 50000,//超过50kb一定会单独打包（此时忽略minRemainingSize，maxAsyncRequests，maxInitialRequests）
        cacheGroups: { //那些模块要打包到一个组
          defaultVendors: {
            filename: './static/js/lib.[contenthash:10].js',
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            filename: './static/js/common.[contenthash:10].js',
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          coreJs: {
            filename: './static/js/core.[contenthash:10].js',
            test: /core-js/,
            minChunks: 1,
            priority: 0,
            reuseExistingChunk: true,
          }
        },
      },
      //运行时chunk配置
      runtimeChunk: {
        name: 'runtime'
        // 多入口项目使用运行时chunk会导致多次执行
        // name: (entrypoint) => `runtime~${entrypoint.name}`,
      }
    },
    // 配置性能提示
    performance: { hints: false },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx', 'scss', 'sass', 'vue'],
      // 配置路径别名
      alias: {
        "@": path.resolve(__dirname, 'src')
      }
    },
    plugins: [
      //eslint语法检查
      new EslintPlugin({
        context: path.resolve(__dirname, 'src'),
        exclude: 'node_modules',
        //Eslint开启缓存
        cache: true,
        cacheLocation: path.resolve(__dirname, 'node_modules/.cache/eslintcache'),
        threads //开启多线程
      }),
      //自动生成html并将资源引入
      new HtmlWebPackPlugin({
        template: path.resolve(__dirname, 'public/index.html')
      }),
      //提取css到外部文件
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:10].css',
        chunkFilename: 'static/css/[name].chunk.[contenthash:10].css'
      }),
      // 开启新线程完成ts类型检查
      new ForkTsCheckerWebpackPlugin({
        // 是否与编译同步进行类型检查
        async: false,
        // 是否在devServer显示编译错误
        devServer: true
      }),
      //preload
      // new PreloadWebapckPlugin({
      //     rel: 'preload',
      //     as: 'script'
      // }),
      //prefetch
      // new PreloadWebapckPlugin({
      //     rel: 'prfetch'
      // }),
      //PWA
      // new WorkboxWebpackPlugin.GenerateSW({
      //     clientsClaim: true,
      //     skipWaiting: true,
      // })
    ]
  }
}

function GetDevOptions(ScriptParams) {
  const option = GetCommonOptions(ScriptParams);
  option.mode = 'development';
  option.devServer = {
    // 使用的静态资源路径
    // static: {
    //   directory: path.join(__dirname, 'public'),
    // },
    host: 'localhost',
    port: '8080',
    //自动打开页面
    open: true,
    //开启HMR模块热更新
    hot: true,
    // 是否在文件更新后刷新浏览器
    // liveReload: false,
    // 写入硬盘
    // writeToDisk: true
  }
  //源代码映射
  option.devtool = 'cheap-module-source-map';
  return option;
}

function GetProdOptions(ScriptParams) {
  const option = GetCommonOptions(ScriptParams);
  option.mode = 'production';
  // option.devtool = 'source-map';
  // GB2312转码
  // const EncodePlugin = require('./plugins/encode');
  // option.plugins.push(new EncodePlugin());

  // 包分析器插件,生成构建报告
  if ('report' in ScriptParams) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    option.plugins.push(// 配置包分析器
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        // analyzerMode: 'server',
        // analyzerMode: 'disabled',
        // analyzerHost: '127.0.0.1',
        // analyzerPort: 8888,
        reportFilename: '../report/report.html',
        defaultSizes: 'gzip',
        generateStatsFile: true, // 如果为true，则Webpack Stats JSON文件将在bundle输出目录中生成
        openAnalyzer: false, // 默认在浏览器中自动打开报告
        statsFilename: '../report/stats.json', // 如果generateStatsFile为true，将会生成Webpack Stats JSON文件的名字
        statsOptions: { source: false }
      })
    );
  }

  return option;
}

module.exports = {
  getOptions: function (ScriptParams) {
    if (ScriptParams.mode === 'development') {
      return GetDevOptions(ScriptParams);
    }
    return GetProdOptions(ScriptParams);
  }
}


