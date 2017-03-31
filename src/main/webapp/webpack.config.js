const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const defaults = {
  entry: './app/index.jsx',
  output: {
    path: path.join(__dirname, './resources/js'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components|public)/,
      loader: "babel"
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }],
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    root: path.resolve('./app'),
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    // Avoid publishing files when compilation fails
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'window.jQuery': 'jquery',
    }),
    // new HtmlWebpackPlugin({
    //   template: path.join(__dirname, './app/index.html'),
    //   filename: 'index.html',
    //   inject: 'body'
    // })
  ],
};

module.exports = defaults;
