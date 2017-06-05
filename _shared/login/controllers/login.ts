'use strict';

import * as express from 'express';
import * as jwt from 'jsonwebtoken';

import { ILogin } from '../models/i-login';
// import { getConnectionManager } from 'typeorm';

module LoginRoute {

  export class Session {

    public create(req: express.Request, res: express.Response, next: express.NextFunction) {

      const userScheme = getUserScheme(req);

      if (userScheme.username.toLowerCase() === 'admin' &&
          userScheme.password.toLowerCase() === 'admin') {

        res.status(201).send({ id_token: prepareJWT() });

      } else {
        res.status(401).send({ message: 'The username or password doesn\'t match' });
      }

    }

  }

  function prepareJWT(): string {
    // Compile Personnel Token Information
    const token = {
      id: 1,
      name: 'Admin Account'
    };
    return jwt.sign(token, process.env.JWT_SECRET, { expiresIn: 60 });
  }


  // Parses user information out of form submit
  function getUserScheme(req: express.Request): ILogin {

    let username = '',
        password = '';

    if (req.body.username) {
      username = req.body.username;
    } else if (req.body.email) {
      username = req.body.email;
    }

    if (req.body.password) {
      password = req.body.password;
    }

    return <ILogin>{
      username: username,
      password: password
    };
  }
}

export = LoginRoute;
