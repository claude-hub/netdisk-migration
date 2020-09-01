const path = require('path');

const Dotenv = require('dotenv-webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');

module.exports = {
  context: paths.src,

  entry: ['./index.tsx'],

  output: {
    path: paths.dist,
    publicPath: '/',
    library: '[name]',
    filename: 'bundle.[name].[hash].js',
    chunkFilename: 'chunk.[name].[chunkhash].js',
    sourceMapFilename: 'sourceMap.[name].[hash].map',
    hashDigest: 'hex',
    hashDigestLength: 8,
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss'],
    alias: {
      actions: path.resolve(paths.src, 'actions'),
      components: path.resolve(paths.src, 'components'),
      constants: path.resolve(paths.src, 'constants'),
      middlewares: path.resolve(paths.src, 'middlewares'),
      features: path.resolve(paths.src, 'features'),
      reducers: path.resolve(paths.src, 'reducers'),
      selectors: path.resolve(paths.src, 'selectors'),
      utils: path.resolve(paths.src, 'utils'),
      typings: path.resolve(paths.src, 'utils'),
      store: path.resolve(paths.src, 'store'),
      style: path.resolve(paths.src, 'style'),
      hoc: path.resolve(paths.src, 'hoc'),
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        include: paths.src,
        exclude: [/node_modules/],
        loader: 'ts-loader',
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=dist/fonts/[name].[ext]',
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),

    new Dotenv({
      path: paths.root('.env'),
      systemvars: true, // allow to also use system env variables
    }),

    new HtmlWebpackPlugin({
      title: 'Address book app',
      filename: 'index.html',
      template: path.join(paths.assets, 'index.html'),
    }),
  ],
};
