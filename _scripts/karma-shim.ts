'use strict';

import 'core-js/es6';
import 'core-js/es7/reflect';
import 'reflect-metadata';

import 'zone.js/dist/zone';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import 'zone.js/dist/sync-test';

Error.stackTraceLimit = Infinity;

let appContext = (<{ context?: Function }>require).context('./src', true, /\.spec\.ts/);

appContext.keys().forEach(appContext);

let testing = require('@angular/core/testing');
let browser = require('@angular/platform-browser-dynamic/testing');

testing.TestBed.initTestEnvironment(
    browser.BrowserDynamicTestingModule,
    browser.platformBrowserDynamicTesting()
);
