var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: path.resolve('src/js'),
  entry: ["./client"],
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  devServer: {
    contentBase: 'src',
  },
  output: {
    path: path.resolve('build/js/'),
    publicPath: '/public/assets/js/',
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.node']
  }
};