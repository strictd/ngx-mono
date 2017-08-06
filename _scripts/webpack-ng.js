'use strict';

// Helper: root(), and rootDir() are defined at the bottom
const path = require('path'),
      webpack = require('webpack'),
      minimist = require('minimist'),
      args = minimist(process.argv),
      rootDir = process.env.PWD || process.cwd(),
      envFile = args.env || path.join(rootDir, '.env'),
      dotenv = require('dotenv').config({path: envFile}).parsed,
      minify = args.minify || false
;

// Webpack Plugins
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin,
      autoprefixer = require('autoprefixer'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      CopyWebpackPlugin = require('copy-webpack-plugin'),
      DashboardPlugin = require('webpack-dashboard/plugin'),
      TsConfigPathsPlugin = require('awesome-typescript-loader'),
      UglifyJSPlugin = require('uglifyjs-webpack-plugin');
;

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */

const ENV = process.env.npm_lifecycle_event,
      isTestWatch = ENV === 'test-watch',
      isTest = ENV === 'test' || isTestWatch,
      buildEnv = ENV.match(/.*?(:)?build/g),
      prodEnv = ENV.match(/.*?(:)?prod/g),
      isProd = ((buildEnv && buildEnv.length) || (prodEnv && prodEnv.length)),
      useHash = false
;



module.exports = function makeWebpackConfig() {

  const _aotEnabled = dotenv.AOT || '',
        _browserSrc = dotenv.BROWSER_SRC || 'src/browser',
        _browserDest = dotenv.BROWSER_DEST || 'dist',
        _srcDir = path.join(rootDir, _browserSrc) || root(_browserSrc),
        _distDir = path.join(rootDir, _browserDest) || root(_browserDest),
        _node_modules = resolvePath(dotenv.NODE_MODULES, root('../../'), 'node_modules'),
        _scriptsDir = dotenv.SCRIPTS_FOLDER || path.dirname(__filename),
        _polyfills = resolvePath(dotenv.BROWSER_POLYFILLS, _srcDir, 'app/polyfills.ts'),
        _assets = resolvePath(dotenv.BROWSER_ASSETS, _srcDir, 'assets'),
        _styles = resolvePath(dotenv.BROWSER_STYLES, _srcDir, 'styles'),
        _global_assets = resolvePath(dotenv.GLOBAL_ASSETS, root('../'), '_assets'),
        _entry_dev = resolvePath(dotenv.BROWSER_ENTRY_DEV, _srcDir, 'app/main.dev.ts'),
        _entry_dev_aot = resolvePath(dotenv.BROWSER_ENTRY_DEV_AOT, _srcDir, 'app/main.dev.aot.ts'),
        _entry_prod = resolvePath(dotenv.BROWSER_ENTRY_PROD, _srcDir, 'app/main.prod.ts'),
        _entry_prod_aot = resolvePath(dotenv.BROWSER_ENTRY_PROD_AOT, _srcDir, 'app/main.prod.aot.ts'),
        _index_html = resolvePath(dotenv.BROWSER_INDEX_HTML, _assets, 'index.html')
  ;

  const _devServer_host = dotenv.BROWSER_DEV_HOST || '0.0.0.0',
        _devServer_port = dotenv.BROWSER_DEV_PORT || 8080,
        _devServer_ssl = !!dotenv.BROWSER_DEV_SSL || false
  ;
   
  if (isProd) { console.log('Compiling Production'); } else { console.log('Compiling Development'); }
  if (_aotEnabled) { console.log('Compiling AOT'); } else { console.log('Compiling JIT'); }
  /**
   * Config
   * Reference: http://webpack.github.io/docs/configuration.html
   * This is the object where all configuration gets set
   */
  let config = {};

  /**
   * Devtool
   * Reference: http://webpack.github.io/docs/configuration.html#devtool
   * Type of sourcemap to use per build type
   */
  if (isProd) {
    config.devtool = '#source-map';
  }
  else if (isTest) {
    config.devtool = '#inline-source-map';
  }
  else {
    config.devtool = '#eval-source-map';
  }

  if (!isTest) {
    /**
     * Entry
     * Reference: http://webpack.github.io/docs/configuration.html#entry
     */
    const _entry_path = isProd ? (_aotEnabled ? _entry_prod_aot : _entry_prod) : (_aotEnabled ? _entry_dev_aot : _entry_dev);
    console.log('Entry Path: ', _entry_path);
    config.entry = isTest ? {} : {
      'polyfills': _polyfills,
      'app': _entry_path // our angular app
    };
  }

  /**
   * Output
   * Reference: http://webpack.github.io/docs/configuration.html#output
   */
  config.output = isTest ? {} : {
    path: _distDir,
    publicPath: '', // isProd ? dotenv.BROWSER_URL_PROD : dotenv.BROWSER_URL_DEVEL,
    filename: useHash ? 'js/[name].[hash].js' : 'js/[name].js',
    chunkFilename: useHash ? '[id].[hash].chunk.js' : '[id].chunk.js'
  };

  /**
   * Resolve
   * Reference: http://webpack.github.io/docs/configuration.html#resolve
   */
  config.resolve = {
    alias: {
      'typeorm': path.resolve(__dirname, './typeorm-fake.ts')
    },
    // only discover files that have those extensions
    extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html'],
    modules: ['node_modules']
  };
  config.node = { 'fs': 'empty' };
  config.externals = [{ './cptable': 'var cptable' }];
  

  const tsconfigBrowser = path.join(_scriptsDir, 'tsconfig-browser.json');
  const tsconfigBrowserAOT = path.join(rootDir, 'tsconfig-aot.json');

  let atlOptions = `configFileName=${((_aotEnabled)?tsconfigBrowserAOT:tsconfigBrowser)}&`;
  if (isTest && !isTestWatch) {
    // awesome-typescript-loader needs to output inlineSourceMap for code coverage to work with source maps.
    atlOptions = `${atlOptions}inlineSourceMap=true&sourceMap=false&`;
  }

  /**
   * Loaders
   * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
   * List: http://webpack.github.io/docs/list-of-loaders.html
   * This handles most of the magic responsible for converting modules
   */
  config.module = {
    rules: [
      {
        test: /config\.app\.ts$/,
        enforce: 'pre',
        loader: 'string-replace-loader',
        query: {
          search: `private _madameService = 'http://localhost:3080/';`,
          replace: `private _madameService = '${(isProd) ?
              dotenv.MADAME_API_PROD : dotenv.MADAME_API_DEVEL}'`
        }
      },

      // Support for .ts files.
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader?' + atlOptions,
          'angular-router-loader',
          'angular2-template-loader'// ,
          // '@angularclass/hmr-loader'
        ],
        exclude: [isTest ? /\.(e2e)\.ts$/ : /\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
      },

      // copy those assets to output
      {
        test: /\.(png|jpe?g|gif|svg|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: useHash ? 'file-loader?name=fonts/[name].[hash].[ext]?' : 'file-loader?name=fonts/[name].[ext]?'
      },
      { 
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },


      // Support for *.json files.
      {test: /\.json$/, loader: 'json-loader'},

      // Support for CSS as raw text
      // use 'null' loader in test mode (https://github.com/webpack/null-loader)
      // all css in src/style will be bundled in an external css file
      {
        test: /\.css$/,
        include: [_node_modules, _styles],
        loader: isTest ? 'null' : ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              { loader: 'css-loader' },
              { loader: 'postcss-loader',
                options: {
                  plugins: (loader) => [
                    require('autoprefixer')
                  ]
                }
              }
            ]
        })
      },
      // all css required in src/app files will be merged in js files
      {test: /\.css$/, exclude: [_node_modules, _styles], loader: [
        { loader: 'raw-loader' },
        { loader: 'postcss-loader',
          options: {
            plugins: (loader) => [
              require('autoprefixer')
            ]
          }
        }
      ]},

      // support for .scss files
      // use 'null' loader in test mode (https://github.com/webpack/null-loader)
      // all css in src/style will be bundled in an external css file
      {
        test: /\.scss$/,
        include: [_node_modules, _styles],
        loader: isTest ? 'null' : ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              { loader: 'css-loader' },
              { loader: 'postcss-loader',
                options: {
                  plugins: (loader) => [
                    require('autoprefixer')
                  ]
                }
              },
              { loader: 'sass-loader' }
            ]
        })
      },
      // all css required in src/app files will be merged in js files
      {test: /\.scss$/, exclude: [_node_modules, _styles], loader: [
        { loader: 'raw-loader' },
        { loader: 'postcss-loader',
          options: {
            plugins: (loader) => [
              require('autoprefixer')
            ]
          }
        },
        { loader: 'sass-loader' }
      ]},

      // support for .sass files
      // user 'null' loader in test mode (https://github.com/webpack/null-loader)
      // all css in src/style will be bundled in an external css file
      {
        test: /\.sass$/,
        include: [_node_modules, _styles],
        loader: isTest ? 'null' : ExtractTextPlugin.extract({
            fallback: 'style-loader', 
            use: [
              { loader: 'css-loader' },
              { loader: 'postcss-loader',
                options: {
                  plugins: (loader) => [
                    require('autoprefixer')
                  ]
                }
              },
              { loader: 'sass-loader' }
            ]
        })
      },
      // all css required in src/app files will be merged in js files
      {test: /\.sass$/, exclude: [_node_modules, _styles], loader: [
        { loader: 'raw-loader' },
        { loader: 'postcss-loader',
          options: {
            plugins: (loader) => [
              require('autoprefixer')
            ]
          }
        },
        { loader: 'sass-loader?indentedSyntax'}
      ]},


      // support for .html as raw text
      // todo: change the loader to something that adds a hash to images
      {test: /\.html$/, loader: 'raw-loader'}
    ]
  };
  
  if (isTest && !isTestWatch) {
    // instrument only testing sources with Istanbul, covers ts files
    config.module.rules.push({
      test: /\.ts$/,
      enforce: 'post',
      include: _srcDir,
      loader: 'istanbul-instrumenter-loader',
      exclude: [/\.spec\.ts$/, /\.e2e\.ts$/, /node_modules/]
    });
  }

  if (!isTest || !isTestWatch) {
    // tslint support
    config.module.rules.push({
      test: /\.ts$/,
      enforce: 'pre',
      loader: 'tslint-loader',
      options: {
        configFile: path.join(_scriptsDir, 'tslint.json')
      }
    });
  }

  /**
   * Plugins
   * Reference: http://webpack.github.io/docs/configuration.html#plugins
   * List: http://webpack.github.io/docs/list-of-plugins.html
   */
  config.plugins = [
    // Define env letiables to help with builds
    // Reference: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
    new webpack.DefinePlugin({
      // Environment helpers
      'process.env': {
        ENV: JSON.stringify(ENV)
      }
    }),

    new webpack.ProvidePlugin({
      io: 'socket.io-client'
    }),

    // Workaround needed for angular 2 angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      _srcDir // location of your src
    )

    // Tslint configuration for webpack 2
//    new webpack.LoaderOptionsPlugin({
//      options: {
        /**
         * Apply the tslint loader as pre/postLoader
         * Reference: https://github.com/wbuchwalter/tslint-loader
         */
//        tslint: {
//          emitErrors: false,
//          failOnHint: false
//        },
        /**
         * Sass
         * Reference: https://github.com/jtangelder/sass-loader
         * Transforms .scss files to .css
         */
//        sassLoader: {
          //includePaths: [path.resolve(__dirname, "node_modules/foundation-sites/scss")]
//        },
        /**
         * PostCSS
         * Reference: https://github.com/postcss/autoprefixer-core
         * Add vendor prefixes to your css
         */
//        postcss: [
//          autoprefixer({
//            browsers: ['last 2 version']
//          })
//        ]
//      }
//    })
  ];

  if (!isTest && !isProd) {
    config.plugins.push(new DashboardPlugin());
  }

  if (!isTest && !isTestWatch) {
    config.plugins.push(

      // Generate common chunks if necessary
      // Reference: https://webpack.github.io/docs/code-splitting.html
      // Reference: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
      new CommonsChunkPlugin({
        name: ['polyfills']
      }),

      // Inject script and link tags into html files
      // Reference: https://github.com/ampedandwired/html-webpack-plugin
      new HtmlWebpackPlugin({
        inject: 'body',
        template: _index_html,
        chunksSortMode: 'dependency'
      }),

      // Extract css files
      // Reference: https://github.com/webpack/extract-text-webpack-plugin
      // Disabled when in test mode or not in build mode
      new ExtractTextPlugin({
        filename: useHash ? 'css/[name].[hash].css' : 'css/[name].css',
        disable: !isProd
      })
    );
  }

  // Add build specific plugins
  if (isProd) {
    config.plugins.push(
      // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
      // Only emit files when there are no errors
      new webpack.NoEmitOnErrorsPlugin(),

      // // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
      // // Dedupe modules in the output
      // new webpack.optimize.DedupePlugin(),

      // Copy assets from the public folder
      // Reference: https://github.com/kevlened/copy-webpack-plugin
      new CopyWebpackPlugin([{
        from: _assets
      }, {
        from: _global_assets
      }, {
        from: root('../_scripts/extras', '.htaccess') /* ,
        transform: (content, path) => {
          let data = content.toString();
          data = data.replace(/RewriteBase \//, `RewriteBase ${(isProd) ? dotenv.BROWSER_URL_PROD : dotenv.BROWSER_URL_DEVEL}`)
          return Buffer(data);
        } */
      }, {
        from: root('../_scripts/extras', 'web.config') /*,
        transform: (content, path) => {
          let data = content.toString();
          data = data.replace(/<action type="Rewrite" url="\/" \/>/, `<action type="Rewrite" url="${(isProd) ? dotenv.BROWSER_URL_PROD : dotenv.BROWSER_URL_DEVEL}" />`)
          return Buffer(data);
        } */
      }])
    );
  }

  if (minify) {
    // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
    // Minify all javascript, switch loaders to minimizing mode  
    config.plugins.push(
      // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
      // Minify all javascript, switch loaders to minimizing mode
      // new webpack.optimize.UglifyJsPlugin({sourceMap: true, mangle: { keep_fnames: true }}),
      new UglifyJSPlugin({sourceMap: false, mangle: { keep_fnames: true }})
    );
  }  

  /**
   * Dev server configuration
   * Reference: http://webpack.github.io/docs/configuration.html#devserver
   * Reference: http://webpack.github.io/docs/webpack-dev-server.html
   */
  config.devServer = {
    contentBase: [_assets, _global_assets],
    historyApiFallback: true,
//    quiet: true, // sets quiet mode in console output
    stats: 'minimal', // none (or false), errors-only, minimal, normal (or true) and verbose
    inline: true,
    host: _devServer_host,
    port: _devServer_port
  };

  if (_devServer_ssl) {
   // config.devServer.https = true;
   // config.devServer.inline = false;
  }

  return config;
}();

// Helper functions
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}

function resolvePath(envar, srcDir, defaultFile) {
  return (envar) ? path.join(rootDir, envar) :
             path.join(srcDir, defaultFile);
}
