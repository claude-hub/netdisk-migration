const path = require('path');
const merge = require('webpack-merge');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const paths = require('./paths');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',

  watch: true,

  devtool: 'source-map',

  devServer: {
    contentBase: [paths.assets, paths.dist],
    hot: true,
    open: true,
    historyApiFallback: true,
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
});
