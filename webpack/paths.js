const path = require('path');

const root = path.join.bind(path, path.resolve(__dirname, '..'));

module.exports = {
  src: root('src'),
  dist: root('dist'),
  distFonts: root('dist/fonts'),
  distImages: root('dist/images'),
  assets: root('assets'),
  assetsFonts: root('assets/fonts'),
  assetsImages: root('assets/images'),
  assetsFavicon: root('assets/favicon.ico'),
  assetsManifest: root('assets/manifest.json'),
  root,
};
