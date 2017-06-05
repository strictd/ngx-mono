'use strict';

const path = require('path'),
      rootDir = process.env.INIT_CWD || process.env.IONIC_ROOT_DIR,
      dotenv = require('dotenv').config({path: path.join(rootDir, '.env')}).parsed,
      nodeRoot = dotenv.NODE_MODULES || '',
      webpack = require('webpack'),
      ionicWebpackFactory = require(process.env.IONIC_WEBPACK_FACTORY);

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */

const ENV = process.env.npm_lifecycle_event,
      isTestWatch = ENV === 'test-watch',
      isTest = ENV === 'test' || isTestWatch,
      buildEnv = ENV.match(/.*?(:)?build/g),
      isProd = (buildEnv && buildEnv.length)
;

module.exports = {
  entry: process.env.IONIC_APP_ENTRY_POINT,
  output: {
    path: '{{BUILD}}',
    filename: process.env.IONIC_OUTPUT_JS_FILE_NAME,
    devtoolModuleFilenameTemplate: ionicWebpackFactory.getSourceMapperFunction(),
  },
  devtool: process.env.IONIC_GENERATE_SOURCE_MAP ? process.env.IONIC_SOURCE_MAP_TYPE : '',

  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: [path.resolve(`${nodeRoot}`)]
  },

  module: {
    rules: [
      {
        test: /config\.app\.ts$/,
        // enforce: 'pre',
        loader: 'string-replace-loader',
        query: {
          search: `http://localhost:3080/`,
          replace: `${(isProd) ? dotenv.MADAME_API_PROD : dotenv.MADAME_API_DEVEL}`
        }
      },    
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        //test: /\.(ts|ngfactory.js)$/,
        test: /\.ts$/,
        loader: process.env.IONIC_WEBPACK_LOADER
      },
      {
        test: /\.js$/,
        loader: process.env.IONIC_WEBPACK_TRANSPILE_LOADER
      },
      {
        test: /\.css$/,
        loader: 'raw-loader'
      },
      {
        test: /\.scss$/,
        loader: 'raw-loader!sass-loader'
      }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({sourceMap: true, mangle: { keep_fnames: true }}),
    ionicWebpackFactory.getIonicEnvironmentPlugin()
  ],

  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
