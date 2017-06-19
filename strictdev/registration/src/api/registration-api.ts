'use strict';

import { readFileSync } from 'fs';
const api_settings = {
  http_server: true,
  http_ip: '0.0.0.0',
  http_port: 14001,

  logger: 'dev',

  bodyparser_json: {},
  bodyparser_urlencoded: {extended: true},

  session_secret: 'change me'
};
process.env.api_settings = api_settings;

process.env.IP = '0.0.0.0';
process.env.PORT = 4001;

// process.env.KNEX_SHOW_SQL = true;
// process.env.GOOGLE_API_SHEET = '';
// process.env.GOOGLE_API_EMAIL = '';
// process.env.GOOGLE_API_CERT = '';
process.env.GOOGLE_CAPTCHA = '6LfS7xMUAAAAADwyLK9azcHroZou2UN72ghMRm3P'; // ReCaptcha Serverside Key

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
import * as CachePdfWysiwyg from '../../../utils/pdf-wysiwyg/controllers/pdf-wysiwyg-cache';

const _sources = [
  {
    'store_id': 'strictdev',
    'registration': {
      'sheets': CacheSheets
    },
    'pdf_wysiwyg': {
      'forms': 'dev_dsm.pdf_wysiwyg_forms',
      'versions': 'dev_dsm.pdf_wysiwyg_versions',
      'data': 'dev_dsm.pdf_wysiwyg_data',
      'saveMethod': 'historical', // or 'overwrite',
      'db': CachePdfWysiwyg
    }
  }
];



import * as express from 'express';
import { API, APIConfig } from '../../../../_scripts/api';
const app = express();

// add Redis Server Support
/*
import { DB as RedisDB } from '../../../db/redis_example';
RedisDB.config = { ip: '127.0.0.1' };
app.locals.redisDB = RedisDB;
*/

// add database sources to app
app.locals.sources = _sources;

// Preconfiguation of express app
APIConfig(app, api_settings);

// configure routes
_routes.map(r => app.use(r));


// Setup API Listener

API(app, api_settings);
