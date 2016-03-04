"use strict"

var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var webpackStream = require("webpack-stream");
var WebpackDevServer = require("webpack-dev-server");
var path = require("path");

var config = require("./webpack.config");

let prodConfig = require("./webpack.prodconfig");

gulp.task( "copyTpl", ()=> {
  gulp.src(["src/templates/**/*"]).pipe( gulp.dest("www/templates") );
  return;
});


gulp.task( "production", ( cb) => {
  webpack( prodConfig, ( err, stat) => {
    if(err) throw new gutil.PluginError("webpack", err);
    return cb();
  });
});

gulp.task("serve", (req,res) => {

  var compiler = webpack(config);
  process.env.NODE_ENV = "development";

  new WebpackDevServer(compiler, {
      noInfo: true,
      contentBase: path.resolve(__dirname, "src"),
      publicPath: config.output.publicPath,
      host: 'localhost',
      port: 8080,
      hot: true,
      historyApiFallback: {
        index: 'index.html'
      },
      proxy: {
        "/api/*": "http://0.0.0.0:3000/"
      }
      // watchDelay: 300
  }).listen(8080, "localhost", function(err) {
      if(err) throw new gutil.PluginError("webpack-dev-server", err);
      // Server listening
      gutil.log("[webpack-dev-server]", "http://localhost:8080/");

  });

});
