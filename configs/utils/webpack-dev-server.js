/**
 * 开发服务器
 */
var appPaths = require('../app-paths.js');

module.exports = {
  contentBase: appPaths.devServer.contentBase,
  compress: true,
  host: '0.0.0.0',
  port: appPaths.devServer.port,
  hot: true,
  overlay: true,
  inline: true,
  stats: {
    all: undefined,
    assets: false,
    builtAt: false,
    cached: false,
    children: false,
    chunks: false,
    chunkModules: false,
    chunkOrigins: false,
    modules: false,
    performance: false,
  },
  clientLogLevel: 'none',
}
