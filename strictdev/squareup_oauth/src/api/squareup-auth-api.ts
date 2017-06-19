'use strict';

import { readFileSync } from 'fs';
const api_settings = {
  http_port: 9001,
  logger: 'dev',
  bodyparser_json: {},
  bodyparser_urlencoded: {extended: true}
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
