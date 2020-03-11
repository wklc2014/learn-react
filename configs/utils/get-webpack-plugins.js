/**
 * 配置 webpack 插件系统
 */
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var allPaths = require('../all-paths.js');

function getWebpackPlugins(env) {

  var webpack_plugins = [
    new CopyWebpackPlugin(allPaths.copyWebpackPlugin),
    new CleanWebpackPlugin(allPaths.cleanWebpackPlugin),
    new webpack.ProvidePlugin(allPaths.webpackProvidePlugin),
  ];

  allPaths.htmlWebpackPlugin.forEach(p => {
    webpack_plugins.push(new HtmlWebpackPlugin(p));
  })

  var pluginsForProd = [
    new MiniCssExtractPlugin(allPaths.miniCssExtractPlugin),
    new UglifyJSPlugin(allPaths.uglifyJSPlugin),
  ];

  var pluginsForDev = [
    new webpack.HotModuleReplacementPlugin(),
  ];

  if (env === 'production') {
    return webpack_plugins.concat(pluginsForProd);
  } else if (env === 'development') {
    return webpack_plugins.concat(pluginsForDev);
  }

  return [];
}

module.exports = getWebpackPlugins;