"use strict"
var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var webpackStream = require("webpack-stream");
var WebpackDevServer = require("webpack-dev-server");
var path = require("path");

var browserSync = require("browser-sync").create();
var history = require('connect-history-api-fallback');

var webpackDevConfig = require("./webpack.config.dev");
let webpackProdConfig = require("./webpack.config.prod");

var jsonServer    = require('json-server');

var config = {
  webpackPort: 7000,
  dev: webpackDevConfig,
  prod: webpackProdConfig
}

gulp.task( "copyTpl", ()=> {
  gulp.src(["src/templates/**/*"]).pipe( gulp.dest("www/templates") );
  return;
});


gulp.task( "production", ( cb) => {
  webpack( config.prod, ( err, stat) => {
    if(err) throw new gutil.PluginError("webpack", err);
    browserSync.init({
      server: {
        baseDir: "./dist",
        middleware: [ history() ]
      }
    })
    return cb();
  });
});

gulp.task("serve.webpack", done => {

  var compiler = webpack(webpackDevConfig);
  process.env.NODE_ENV = "development";

  new WebpackDevServer(compiler, {
      noInfo: true,
      contentBase: path.resolve(__dirname, "src"),
      publicPath: webpackDevConfig.output.publicPath,
      host: 'localhost',
      port: config.webpackPort,
      hot: true,
      historyApiFallback: {
        index: 'index.html'
      },
      proxy: {
        "/api/*": "http://0.0.0.0:3000/"
      }
      // watchDelay: 300
  }).listen(config.webpackPort, "localhost", function(err) {
      if(err) throw new gutil.PluginError("webpack-dev-server", err);
      // Server listening
      gutil.log("[webpack-dev-server]", `http://localhost:${config.webpackPort}/`);
      done();

  });

});

gulp.task("serve.json", done => {
  var server = jsonServer.create();
  server.use(jsonServer.defaults());
  server.use(jsonServer.router('db.json'));

  server.listen(3000, 'localhost', function(){
    gutil.log(gutil.colors.gray('-------------------------------------------'));
    gutil.log(gutil.colors.magenta('JSON API Server listening @ localhost:3000'));
    gutil.log(gutil.colors.gray('-------------------------------------------'));
    done();
  });
})

gulp.task( "serve", gulp.parallel( "serve.webpack", "serve.json") );
