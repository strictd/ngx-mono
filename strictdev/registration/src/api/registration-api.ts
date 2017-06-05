'use strict';

import { readFileSync } from 'fs';
const api_settings = {
  http_server: true,
  ip: '0.0.0.0',
  port: 14001,

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
process.env.api_settings = api_settings;

process.env.IP = '0.0.0.0';
process.env.PORT = 4001;

// process.env.KNEX_SHOW_SQL = true;
// process.env.GOOGLE_API_SHEET = '';
// process.env.GOOGLE_API_EMAIL = '';
// process.env.GOOGLE_API_CERT = '';
process.env.GOOGLE_CAPTCHA = '';

process.env.SHIRTID_CASESENSITIVE = false;
process.env.SHORTID_CHARS = '23456789-ABCDEFGHJKLMNPQRSTVWXYZ';
process.env.SHORTID_REMOVEWORDS = 'anal,anus,arse,ass,ballsack,balls,bastard,bitch,biatch,bloody,blowjob,blowjob,bollock,bollok,boner,boob,bugger,bum,butt,buttplug,clitoris,cock,coon,crap,cunt,damn,dick,dildo,dyke,fag,feck,fellate,fellatio,felching,fuck,fudgepacker,fudgepacker,flange,goddamn,god,hell,homo,jerk,jizz,knobend,labia,lmao,lmfao,muff,nigger,nigga,omg,penis,piss,poop,prick,pube,pussy,queer,scrotum,sex,shit,slut,smegma,spunk,tit,tosser,turd,twat,vagina,wank,whore,wtf';

// process.env.SQUARE_ACCESS_TOKEN = '';
// process.env.SQUARE_BASE_URL = '';

import * as RegistrationRoutes from '../routes/registration';
const _routes = [
  RegistrationRoutes
];




// import * as REGISTRATION_MYSQL from '../controllers/registration-mysql';
// import * as GoogleSheets from '../controllers/google-sheets.v4';
import * as CacheSheets from '../controllers/cache-sheets';

const _sources = [
  {
    'store_id': 'strictdev',
    'registration': {
      'sheets': CacheSheets
    }
  }
];



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
