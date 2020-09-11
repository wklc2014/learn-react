var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var appPaths = require('../app-paths.js');

module.exports = function webpackPlugins(env) {

  var webpack_plugins = [
    new CopyWebpackPlugin(appPaths.copyWebpackPlugin),
    new CleanWebpackPlugin(appPaths.cleanWebpackPlugin),
    new webpack.ProvidePlugin(appPaths.webpackProvidePlugin),
  ];

  appPaths.htmlWebpackPlugin.forEach(p => {
    webpack_plugins.push(new HtmlWebpackPlugin(p));
  })

  var pluginsForProd = [
    new MiniCssExtractPlugin(appPaths.miniCssExtractPlugin),
    new UglifyJSPlugin(appPaths.uglifyJSPlugin),
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
