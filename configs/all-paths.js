/**
 * 项目配置路径
 */
var path = require('path');

module.exports = {
  entry: {
    app: path.join(__dirname, '../src/entries/index.js'),
  },
  htmlWebpackPlugin: [
    {
      template: path.join(__dirname, '../src/entries/index.html'),
      favicon: path.join(__dirname, '../src/entries/favicon.ico'),
    }
  ],
  copyWebpackPlugin: [
    {
      from: path.join(__dirname, '../public/'),
      to: path.join(__dirname, '../dist/'),
    }
  ],
  cleanWebpackPlugin: {
    cleanOnceBeforeBuildPatterns: [
      path.join(__dirname, '../dist/**/*'),
    ]
  },
  webpackProvidePlugin: {},
  miniCssExtractPlugin: {
    filename: '[name].min.css',
  },
  uglifyJSPlugin: {
    sourceMap: true,
  },
  output: {
    path: path.join(__dirname, '../dist/'),
    filename: '[name].min.js',
  },
  performance: {
    hints: false,
  },
  devServer: {
    contentBase: path.join(__dirname, '../dist/'),
    port: 4440,
  },
  filePath: {
    src: path.join(__dirname, '../src/'),
    node_modules: path.join(__dirname, '../node_modules/'),
  },
}
