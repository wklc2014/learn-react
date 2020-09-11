module.exports = function webpackLoaderForHtml(env) {

  var webpack_loaders = [];

  var html_loader = {
    loader: 'html-loader',
    options: {
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
    },
  }

  if (env === 'production') {
    Object.assign(html_loader.options, {
      minimize: true,
      removeComments: true,
      minifyJS: true,
      minifyCSS: true
    });
  } else if (env === 'development') {
    Object.assign(html_loader.options, {
      minimize: false,
      removeComments: false,
      minifyJS: false,
      minifyCSS: false
    });
  }

  webpack_loaders.push(html_loader);

  return webpack_loaders;
}
