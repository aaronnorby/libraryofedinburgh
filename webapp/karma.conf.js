var webpackConfig = require('./webpack.config');
// override devtool option in webpack config
webpackConfig.devtool = 'inline-source-map';

module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],

    files: [
      'tests.bundle.js'
    ],

    frameworks: ['chai', 'mocha'],
    
    plugins: [
      'karma-chrome-launcher',
      'karma-chai-plugins',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack'
    ],

    preprocessors: {
      'tests.bundle.js': ['webpack', 'sourcemap']
    },

    webpackMiddleware: {
      noInfo: true // shuts up webpack's console output
    },

    reporters: ['dots'],
    
    singleRun: true,

    webpack: webpackConfig

  })
}
