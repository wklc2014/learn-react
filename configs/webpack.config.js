var path = require('path');
var webpackLoaderForJs = require('./utils/webpack-loader-for-js.js');
var webpackLoaderForCss = require('./utils/webpack-loader-for-css.js');
var webpackLoaderForImage = require('./utils/webpack-loader-for-image.js');
var webpackLoaderForHtml = require('./utils/webpack-loader-for-html.js');
var webpackPlugins = require('./utils/webpack-plugins.js');
var webpackDevServer = require('./utils/webpack-dev-server.js');
var appPaths = require('./app-paths.js');

module.exports = function() {
  var env = process.env.NODE_ENV || 'development';

  var mode = env === 'production' ? 'production' : 'development';
  var devtool = env === 'production' ? 'none' : 'source-map';

  // 入口文件
  var entry = appPaths.entry;

  // 输出文件
  var output = appPaths.output;

  // 性能
  var performance = appPaths.performance;

  var configs = {
    mode,
    devtool,
    entry,
    output,
    performance,
    plugins: webpackPlugins(env),
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: appPaths.common.src,
          use: webpackLoaderForJs(env),
        },
        {
          test: /\.less$/,
          include: appPaths.common.src,
          use: webpackLoaderForCss(env),
        },
        {
          test: /\.(css|less)$/,
          include: appPaths.common.node_modules,
          use: webpackLoaderForCss(env, 'node_modules'),
        },
        {
          test: /\.(png|jpg|gif)$/,
          include: appPaths.common.src,
          use: webpackLoaderForImage(env),
        },
        {
          test: /\.html$/,
          include: appPaths.common.src,
          use: webpackLoaderForHtml(env),
        },
      ],
    },
    resolve: {
      alias: appPaths.alias,
    },
  };

  if (env === 'development') {
    configs.devServer = webpackDevServer;
  }

  return configs;
}
