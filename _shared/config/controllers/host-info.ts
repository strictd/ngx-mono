import { Request, Response, Application, NextFunction } from 'express';
import Url = require('url');

namespace HostInfo {

  'use strict';

  export function getHost(req: Request) {
    const host = getOrigin(req) || '';
    if (host) { return Url.parse(host).host; }
    return host;
  }

  export function getIp(req: Request) {
    return req.headers['x-forwarded-for'] || req.connection.remoteAddress || '';
  }

  export function getOrigin(req: Request) {
    const headers = req.headers || {};
    return headers['referer'] || req.get('origin');
  }

  export function getIdentFromHost(req: Request) {
    const host = getHost(req);
    switch (host) {
      case 'localhost:8080': return null;
    }
    return null;
  }

}

export = HostInfo;
