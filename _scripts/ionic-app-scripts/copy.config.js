// this is a custom dictionary to make it easy to extend/override
// provide a name for an entry, it can be anything such as 'copyAssets' or 'copyFonts'
// then provide an object with a `src` array of globs and a `dest` string
'use strict';

const path = require('path'),
      rootDir = process.env.INIT_CWD || process.env.IONIC_ROOT_DIR,
      dotenv = require('dotenv').config({path: path.join(rootDir, '.env')}).parsed,
      monoRoot = dotenv.MONO_ROOT || '',
      nodeRoot = dotenv.NODE_MODULES || '';

module.exports = {
  copyAssets: {
    src: ['{{SRC}}/assets/**/*', `${monoRoot}/_assets/**/*`],
    dest: '{{WWW}}'
  },
  copyIndexContent: {
    src: ['{{SRC}}/index.html', '{{SRC}}/manifest.json', '{{SRC}}/service-worker.js'],
    dest: '{{WWW}}'
  },
  copyFonts: {
    src: [`${nodeRoot}/ionicons/dist/fonts/**/*`, `${nodeRoot}/ionic-angular/fonts/**/*`],
    dest: '{{WWW}}/fonts'
  },
  copyPolyfills: {
    src: [`${nodeRoot}/ionic-angular/polyfills/polyfills.js`],
    dest: '{{BUILD}}'
  },
  copySwToolbox: {
    src: [`${nodeRoot}/sw-toolbox/sw-toolbox.js`],
    dest: '{{BUILD}}'
  }
}