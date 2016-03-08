var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');


module.exports = {
  cache: true,
  debug: true,
  devtool: 'source-map',
  // entry: [
  //   "babel-polyfill",
  //   "./src/js/index.js"
  // ],

  entry: {
    main: "./src/js/index.js",
    vendor: [
      'angular',
      'angular-ui-router',
      "babel-polyfill",
      'ng-redux',
      'redux'
    ]
  },

  output: {
    filename: '[name].js',
    path: path.resolve('./dist'),
    publicPath: '/'
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel', query: { presets: ['es2015']} },
      { test: /\.html$/, loader: 'raw' },
      // { test: /\.scss$/, loaders: [ "style", "css?sourceMap", "sass?sourceMap" ]},
      { test: /\.scss$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader") },
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
      { test: /.(jpg|png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/, loader: 'url-loader' },
      { test: /\.tpl$/, loader: 'html' }
    ]
  },

  sassLoader: {
    outputStyle: 'compressed',
    precision: 10,
    sourceComments: false
  },

  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', '[name].js'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        dead_code: true,
        screw_ie8: true,
        unused: true,
        warnings: false
      }
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      moment: "moment",
      "window.moment": "moment"
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      hash: true,
      inject: 'body',
      template: './template/index.html', // Load a custom template
    })
  ],

  stats: {
    cached: true,
    cachedAssets: true,
    chunks: true,
    chunkModules: false,
    colors: true,
    hash: false,
    reasons: true,
    timings: true,
    version: false
  }
};
