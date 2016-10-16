'use strict';

const path = require('path');
const gulp = require('gulp');
const gutil = require('gulp-util');
const del = require('del');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const devConfig = require('./webpack.config');
const prodConfig = require('./webpack.production.config');

gulp.task('webpack:serve', function(cb) {
  let config = Object.create(devConfig);
  config.entry.app.unshift(
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server');

  let compiler = webpack(config);

  new WebpackDevServer(compiler, {
    contentBase: path.join(__dirname, './dist'),
    hot: true,
    noInfo: true
  }).listen(8080, "localhost", function(err) {
    if (err) throw new gutil.PluginError("webpack-dev-server", err);
    gutil.log("[webpack-dev-server]", "http://localhost:8080");
    cb();
  });
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.*', ['build']);
});

// Production build
gulp.task('build', ['webpack:build']);
gulp.task('webpack:build', function(cb) {
  webpack(prodConfig, function(err, stats) {
    if (err) throw new gutil.PluginError("webpack:build", err);
    gutil.log("[webpack:build]", stats.toString({
      colors: true
    }));
    cb();
  });
});

gulp.task('run', ['webpack:serve']);
gulp.task('clean', function() {
  return del([
    'dist/'
  ]);
});

gulp.task('default', ['dev-build', 'watch']);
