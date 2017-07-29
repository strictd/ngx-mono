'use strict';

if (process.argv.length < 4) {
  console.log('MISSING INPUT / OUTPUT FILE PATHS IN COMMAND');
  return;
}

const path = require('path'),
      webpack = require('webpack'),
      minimist = require('minimist'),
      args = minimist(process.argv),
      rootDir = process.env.PWD || process.cwd(),
      envFile = args.env || path.join(rootDir, '.env'),
      dotenv = require('dotenv').config({path: envFile}).parsed,
      minify = args.minify || dotenv.MINIFY || false,
      banner = args.banner || dotenv.BANNER || false
;

const CopyWebpackPlugin = require('copy-webpack-plugin');
      // ButternutWebpackPlugin = require('butternut-webpack-plugin').default;
      // UglifyJSPlugin = require('uglifyjs-webpack-plugin');
      // webpackUglifyJsPlugin = require('webpack-uglify-js-plugin');
      // ClosureCompilerPlugin = require('webpack-closure-compiler');

console.log('Root Dir: ', rootDir);
console.log('Input File: ', process.argv[2]);
console.log('Output File: ', process.argv[3]);
console.log('Environment File: ', envFile);
console.log('Webpack Config: ', __filename);
console.log('Minify: ', (minify)?'Yes':'No');
console.log('Banner: ', (banner)?'Yes':'No');

const ENV = process.env.npm_lifecycle_event || '',
      isTestWatch = ENV === 'test-watch',
      isTest = ENV === 'test' || isTestWatch,
      buildEnv = ENV.match(/.*?:build/g),
      isProd = (buildEnv && buildEnv.length)
;

module.exports = function makeWebpackConfig() {
  const _assetsDir = args.assets || dotenv.CLI_ASSETS || path.dirname(process.argv[2]) || null,
        _scriptsDir = dotenv.SCRIPTS_FOLDER || path.dirname(__filename),
        _tsConfigCli = `${_scriptsDir}/tsconfig-cli.json`,
        _atlOptions = `configFileName=${_tsConfigCli}&`;

  console.log('TSConfig File: ', _tsConfigCli);
  console.log('Assets Dir: ', _assetsDir);

  let config = {};

  config.target = 'node';

  config.node = {
    __filename: false,
    __dirname: false
  };

  config.resolve = {
    extensions: [ '.ts', '.js', '.json' ]
  };
  /**
   * Devtool
   * Reference: http://webpack.github.io/docs/configuration.html#devtool
   * Type of sourcemap to use per build type
   */
  if (isProd) {
    config.devtool = 'hidden-source-map';
  }
  else if (isTest) {
    config.devtool = 'inline-source-map';
  }
  else {
    config.devtool = 'source-map'; // eval-source-map
  }

 

  config.module = {
    rules: [
      {
        test: /\.ts$/,
        loader: `awesome-typescript-loader?${_atlOptions}`,
        exclude: [isTest ? /\.(e2e)\.ts$/ : /\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
      },
      /*{
        test: /\.ts$/,
        loader: 'ts-loader',
        options: { configFileName: `${_scriptsDir}/tsconfig-cli.json` },
        exclude: [isTest ? /\.(e2e)\.ts$/ : /\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
      },*/

      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          configFile: `${_scriptsDir}/tslint.json`
        }
      }      
    ]
  };

  config.externals = [];
  config.plugins = [];

  // KNEX dependancies
  config.externals.push('msnodesqlv8', 'tds', 'msnodesql', 'oracledb', 'strong-oracle', 'oracle',
                      'pg-query-stream', 'pg', 'mysql', 'mariasql', 'sqlite', 'sqlite3');
  // Add build specific plugins
  
  if (banner) {
    config.plugins.push(
      new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true })
    );
  }

  if (_assetsDir) {
    // Copy assets from the public folder
    // Reference: https://github.com/kevlened/copy-webpack-plugin
    config.plugins.push(
      new CopyWebpackPlugin([{
        context: _assetsDir,
        from: { glob: '**/*', dot: true }
      }], { ignore: ['*.ts', '*.json']})
    );
  }

  if (isProd) {
    config.plugins.push(
      // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
      // Only emit files when there are no errors
      new webpack.NoEmitOnErrorsPlugin()

      // // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
      // // Dedupe modules in the output
      // new webpack.optimize.DedupePlugin(),
    );
  }

  if (minify) {
    // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
    // Minify all javascript, switch loaders to minimizing mode  
    config.plugins.push(
      // new ButternutWebpackPlugin({})
      // new webpack.optimize.UglifyJsPlugin({ minimize: true, sourceMap: false })
      // new UglifyJSPlugin({sourceMap: false, mangle: { keep_fnames: true }})
      /*new ClosureCompilerPlugin({
        compiler: {
          compilation_level: 'SIMPLE',
          language_in: 'ECMASCRIPT6',
          language_out: 'ECMASCRIPT5',
          output_wrapper: '(function(){\n%output%\n}).call(this)'
        }
      })*/
    );
  }

  return config;
}();

// Helper functions
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}

function resolvePath(envar, srcDir, defaultFile) {
  return (envar) ? path.join(process.cwd(), envar) :
             path.join(srcDir, defaultFile);
}
