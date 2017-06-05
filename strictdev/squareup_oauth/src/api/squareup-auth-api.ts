'use strict';

import { readFileSync } from 'fs';
const api_settings = {
  http_server: true,
  ip: '0.0.0.0',
  port: 9001,

  ssl_server: false,
  // ssl_ip: '0.0.0.0',
  // ssl_port: 3443,
  // ssl_key: process.cwd() + '/server.key',
  // ssl_cert: process.cwd() + '/server.crt',

  use_cors: true,
  whitelist: '*',
  logger: true,
  jade: false,
  jade_views: './views',
  bodyparser_json: {},
  bodyparser_urlencoded: {extended: true},
  bodyparser_text: false
};


// process.env.KNEX_SHOW_SQL = true;

import * as SquareupAuthRoutes from '../routes/squareup-auth-routes';
const _routes = [
  SquareupAuthRoutes
];

const _sources = [];

import * as express from 'express';
import { API, APIConfig } from '../../../../_scripts/api';
const app = express();

// add database sources to app
app.locals.sources = _sources;

// Preconfiguation of express app
APIConfig(app, api_settings);

// configure routes
_routes.map(r => app.use(r));


// Setup API Listener

API(app, api_settings);
