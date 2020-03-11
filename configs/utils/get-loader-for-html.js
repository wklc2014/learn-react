/**
 * html loader
 */

function getLoaderForHtml(env) {

  var webpack_loaders = [];

  var html_loader = {
    loader: 'html-loader',
    options: {
      minimize: false,
    },
  }

  if (env === 'production') {
    Object.assign(html_loader.options, {
      minimize: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      minifyJS: true,
      minifyCSS: true
    });
  } else if (env === 'development') {

  }

  webpack_loaders.push(html_loader);

  return webpack_loaders;
}

module.exports = getLoaderForHtml;