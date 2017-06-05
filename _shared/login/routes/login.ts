'use strict';

import { Router } from 'express';
import * as Login from '../controllers/login';

const router = Router();

const session: Login.Session = new Login.Session();
router.post('/sessions/create', session.create.bind(session.create));

export = router;
