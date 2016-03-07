var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');


module.exports = {
  cache: true,
  debug: true,
  devtool: 'cheap-module-eval-source-map',

  entry: {
    main: [
      'webpack-dev-server/client?http://localhost:7000',
      "babel-polyfill",
      "./src/js/index.js"
    ]
  },

  output: {
    path: path.resolve(__dirname, "/dist/js"),
    filename: "bundle.js",
    publicPath: "/assets/"
  },

  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules'],
    root: path.resolve('./src')
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel', query: { presets: ['es2015']} },
      { test: /\.html$/, loader: 'raw' },
      { test: /\.scss$/, loaders: [ "style", "css?sourceMap", "sass?sourceMap" ]},
      { test: /\.css$/, loaders: [ "style", "css?sourceMap" ] },
      { test: /.(jpg|png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/, loader: 'url-loader' },
      { test: /\.tpl$/, loader: 'html' }
    ]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      moment: "moment",
      "window.moment": "moment"
    }),
    new webpack.NoErrorsPlugin()
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
