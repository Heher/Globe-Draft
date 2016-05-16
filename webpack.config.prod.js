var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    
    './client/client'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': "'production'"
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
    {
      test: /\.js$/,
      include: path.join(__dirname, 'client'),
      exclude: /node_modules/,
      loader: 'babel-loader'
    },
    {
      test: /\.sass$/,
      include: path.join(__dirname, 'client'),
      loaders: ["style", "css", "sass"]
    },
    { 
      test: /\.(png|jpg)$/,
      include: path.join(__dirname, 'client'),
      loader: 'url-loader?limit=8192&name=./img/[hash].[ext]'
    }
    ]
  }
};