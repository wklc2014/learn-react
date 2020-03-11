/**
 * less loader
 */
var path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var LessPluginCleanCss = require('less-plugin-clean-css');
var LessVariables = require('./less-variables.js');

function getLoaderForLess(env, type) {

  var webpack_loaders = [];

  var css_loader = {
    loader: 'css-loader',
    options: {
      modules: true,
    },
  }

  var less_loader = {
    loader: 'less-loader',
    options: {
      plugins: [
        new LessPluginAutoPrefix({
          browsers: [
            'last 2 versions',
            '>0.1%',
          ]
        }),
      ],
      javascriptEnabled: true,
    }
  }

  if (type === 'node_modules') {

    Object.assign(css_loader.options, {
      modules: false,
    });

    Object.assign(less_loader.options, {
      modifyVars: LessVariables,
    });

  }

  if (env === 'production') {
    less_loader.options.plugins.push(new LessPluginCleanCss());
    webpack_loaders.push(MiniCssExtractPlugin.loader);
  }

  else if (env === 'development') {
    webpack_loaders.push('style-loader');
  }

  webpack_loaders.push(css_loader, less_loader);

  return webpack_loaders;
}

module.exports = getLoaderForLess;