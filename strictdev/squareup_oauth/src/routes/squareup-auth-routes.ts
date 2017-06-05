'use strict';

import { Router, Request, Response } from 'express';
import { fetchSource } from '../../../../_shared/config/controllers/db-config';
import { post } from 'request';

const router = Router();

const squareup_base_url = process.env.SQUARE_BASE_URL || '';
const square_access_token = process.env.SQUARE_ACCESS_TOKEN || '';


router.get('/square-up/oauth', (req, res) => {
  const query = req.query || {};

  console.log('Here', query);
  res.status(200).send('');
  
});
export = router;
