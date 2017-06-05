'use strict';
const path = require('path'),
      dotenv = require('dotenv').config({path: path.join(process.env.INIT_CWD, '.env')}).parsed,
      _browserSrc = dotenv.BROWSER_SRC || 'src/browser',
      _srcDir = path.join(process.env.INIT_CWD, _browserSrc) || root(_browserSrc)
;

exports.config = {
  baseUrl: dotenv.BROWSER_URL_DEVEL,

  specs: [
    _srcDir + '/**/*.e2e-spec.js'
  ],
  exclude: [],

  framework: 'jasmine2',

  allScriptsTimeout: 110000,

  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 400000
  },
  directConnect: true,

  capabilities: {
    'browserName': 'chrome'
  },

  onPrepare: function () {
    var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
    // add jasmine spec reporter
    jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: true}));

    browser.ignoreSynchronization = true;
  },


  /**
   * Angular 2 configuration
   *
   * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
   * `rootEl`
   *
   */
  useAllAngular2AppRoots: true
};
