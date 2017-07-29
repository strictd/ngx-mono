'use strict';

import { Router, Request, Response } from 'express';
import { fetchSource } from '../../../../_shared/config/controllers/db-config';
import { post } from 'request';
import { get as unirest_get, post as unirest_post } from 'unirest';

import * as shortid from 'shortid32';

import { waterfall } from 'async';

import { ISquareupLocationCapability } from '../../../squareup_v2/src/models/i-squareup-location';
import { listLocations, findLocationCapability } from '../../../squareup_v2/src/controllers/location';
import { ISquareupAddress } from '../../../squareup_v2/src/models/i-squareup-address';
import { ISquareupCharge, ISquareupChargeResponse } from '../../../squareup_v2/src/models/endpoints/transaction/i-squareup-charge';
import { charge } from '../../../squareup_v2/src/controllers/transaction';
const router = Router();

const squareup_base_url = process.env.SQUARE_BASE_URL || '',
      square_access_token = process.env.SQUARE_ACCESS_TOKEN || '',

      google_captcha_secret = process.env.GOOGLE_CAPTCHA || '',
      shortid_casesensitive = process.env.SHORTID_CASESENSITIVE || false,
      shortid_chars = process.env.SHORTID_CHARS || '-23456789ABCDEFGHJKLMNPQRSTVWXYZ',
      shortid_removewords = process.env.SHORT_REMOVEWORDS || 'anal,anus,arse,ass,ballsack,balls,bastard,bitch,biatch,bloody,blowjob,blowjob,bollock,bollok,boner,boob,bugger,bum,butt,buttplug,clitoris,cock,coon,crap,cunt,damn,dick,dildo,dyke,fag,feck,fellate,fellatio,felching,fuck,fudgepacker,fudgepacker,flange,goddamn,god,hell,homo,jerk,jizz,knobend,labia,lmao,lmfao,muff,nigger,nigga,omg,penis,piss,poop,prick,pube,pussy,queer,scrotum,sex,shit,slut,smegma,spunk,tit,tosser,turd,twat,vagina,wank,whore,wtf';

router.get('/registration/counts.json', (req, res) => {
  const source = fetchSource(req, req.app.locals.sources).registration,
        query = req.query;

  source.sheets.getRegistrationCounts().
  then(data => {
    res.status(200).send(data);
  }).
  catch(err => {
    console.log('Error', err);
    res.status(500).send(err.message);
  });
});

router.get('/registration/:id.json', (req, res) => {
  const source = fetchSource(req, req.app.locals.sources).registration,
        params = req.params || {},
        id = params.id || '',
        short_id = ((!shortid_casesensitive) ? id.toUpperCase() : id);

  source.sheets.getRegistrationQuery(1, short_id).
  then(data => res.status(200).send(data)).
  catch(err => res.status(500).send({errors: [{'detail': err}]}));

});



router.post('/registration.json', (req, res) => {
  const source = fetchSource(req, req.app.locals.sources).registration,
        body = req.body || {};

  const captcaForm = {
    secret: google_captcha_secret,
    response: body.recaptcha,
    remoteip: ''
  };

  try {
    captcaForm.remoteip = req.connection.remoteAddress;
  } catch (e) { }

  // Check Captcha
  new Promise((resolve, reject) => {
    post('https://www.google.com/recaptcha/api/siteverify',
      { form: captcaForm },
      (error, response) => {
        if (!error && response.statusCode === 200) {
          resolve();
        } else {
          reject({message: `Failed Captcha Verification. Code: ${response.statusCode}, ${error}`});
        }
      }
    );
  }).

  // Generate SHORT ID
  then(data => {
    shortid.characters(shortid_chars);
    const searchWords = shortid_removewords;
    const searchExp = new RegExp(searchWords.split(',').join('|'), 'gi');
    body.shortid = shortid.generate();
    if (!shortid_casesensitive) { body.shortid = body.shortid.toUpperCase(); }
    while (searchExp.test(body.shortid)) { body.shortid = shortid.generate(); }
    return Promise.resolve(body);
  }).

  // Add To Google Sheets
  then(data => {
    return source.sheets.addRegistration(body).then(() => {
      return Promise.resolve(body);
    });
  }).
  then(data => { res.status(200).json([data]); }).
  catch(err => {
    console.log('Error', err);
    res.status(500).send(err.message);
  });
});


export = router;
