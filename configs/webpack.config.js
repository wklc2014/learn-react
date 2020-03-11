var path = require('path');
var getLoaderForJavascript = require('./utils/get-loader-for-javascript.js');
var getLoaderForLess = require('./utils/get-loader-for-less.js');
var getLoaderForImage = require('./utils/get-loader-for-image.js');
var getLoaderForHtml = require('./utils/get-loader-for-html.js');
var getWebpackPlugins = require('./utils/get-webpack-plugins.js');
var webpackDevServer = require('./utils/webpack-dev-server.js');
var allPaths = require('./all-paths.js');

module.exports = function() {
  var env = process.env.NODE_ENV;

  var mode = env === 'production' ? 'production' : 'development';
  var devtool = env === 'production' ? 'none' : 'cheap-eval-source-map';

  // 入口文件
  var entry = allPaths.entry;

  // 输出文件
  var output = allPaths.output;

  // 性能
  var performance = allPaths.performance;

  var configs = {
    mode,
    devtool,
    entry,
    output,
    performance,
    plugins: getWebpackPlugins(env),
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: allPaths.filePath.src,
          use: getLoaderForJavascript(env),
        },
        {
          test: /\.less$/,
          include: allPaths.filePath.src,
          use: getLoaderForLess(env),
        },
        {
          test: /\.(css|less)$/,
          include: allPaths.filePath.node_modules,
          use: getLoaderForLess(env, 'node_modules'),
        },
        {
          test: /\.(png|jpg|gif)$/,
          include: allPaths.filePath.src,
          use: getLoaderForImage(env),
        },
        {
          test: /\.html$/,
          include: allPaths.filePath.src,
          use: getLoaderForHtml(env),
        },
      ],
    },
  };

  if (env === 'development') {
    configs.devServer = webpackDevServer;
  }

  return configs;
}