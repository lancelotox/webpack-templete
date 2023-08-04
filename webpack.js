// 解析参数
const ScriptParams = (function () {
  const params = {};
  const input = process.env.npm_lifecycle_script;
  const Regexp = new RegExp(/--(\w*)(?:\s*=\s*|\s*)([^\s]*)/, 'g');

  let result;

  while ((result = Regexp.exec(input)) !== null) {
    params[result[1]] = result[2];
  }

  return params;
})();

// 设置环境
const MODE = ScriptParams.mode || (ScriptParams.mode = 'development');

// 引入webpack + devServer
const webpack = require('webpack');
const devServer = require('webpack-dev-server');
// 导入配置
const Options = require('./webpack.config.js').getOptions(ScriptParams);
const package = require('./package.json');

// 控制台进度条
const WebpackBar = require('webpackbar');
let progressPlugin = new WebpackBar({
  name: package.name, // 进度条名称
  color: "#2f90b9",  // 默认green，进度条颜色支持HEX
  basic: true,   // 默认true，启用一个简单的日志报告器
  profile: false,  // 默认false，启用探查器。
  reporter: {
    start(context) {
      // 在（重新）编译开始时调用
      // const { start, progress, message, details, request, hasErrors } = context
      console.clear();
    },
    change(context) {
      // 在 watch 模式下文件更改时调用
    },
    update(context) {
      // 在每次进度更新后调用
    },
    done(context) {
      // 编译完成时调用
    },
    progress(context) {
      // 构建进度更新时调用
    },
    allDone(context) {
      // 当编译完成时调用
    },
    beforeAllDone(context) {
      // 当编译完成前调用
    },
    afterAllDone(context) {
      // 当编译完成后调用
    }
  }
})
if (!Array.isArray(Options.plugins)) Options.plugins = [];
Options.plugins.push(progressPlugin);

const Compiler = webpack(Options);

if (MODE === 'development') {
  const devOp = Options.devServer;
  // 获取实例
  const server = new devServer({ ...devOp }, Compiler);
  // 启动服务
  const runServer = async () => {
    console.log('Starting server...');
    await server.start();
  };
  // 停止服务
  const stopServer = async () => {
    console.log('Stopping server...');
    await server.stop();
  };
  // 带有成功回调的启动方式
  // server.startCallback(() => {
  //   console.log(`Successfully started server on http${devOp.https ? 's' : ''}://${devOp.host}:${devOp.port}`);
  // });
  // 无回调启动
  runServer();
} else {
  Compiler.run(function (err, stats) {
    if (err) {
      console.error(err);
      return;
    }
    // 控制台输出
    // console.log(
    //   stats.toString({
    //     chunks: false, // 使构建过程更静默无输出
    //     colors: true,  // 在控制台展示颜色
    //   })
    // );
    // 关闭构建进程
    Compiler.close((closeErr) => {
      if (closeErr) {
        console.error(closeErr);
        return;
      }
    });
  });
}
