module.exports = function getLoaderForJs(env) {

  var webpack_loaders = [];

  var babel_loader = {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
    },
  }

  webpack_loaders.push(babel_loader);

  return webpack_loaders;
}
