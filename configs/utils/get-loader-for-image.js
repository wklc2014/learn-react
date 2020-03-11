/**
 * image loader
 */
function getLoaderForImage(env) {

  var webpack_loaders = [];

  var url_loader = {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
      limit: 1024 * 2,
      outputPath: 'images',
    },
  }

  webpack_loaders.push(url_loader);

  if (env === 'production') {
    webpack_loaders.push('image-webpack-loader');
  }

  return webpack_loaders;
}

module.exports = getLoaderForImage;