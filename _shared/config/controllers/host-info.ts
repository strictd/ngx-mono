import { Request, Response, Application, NextFunction } from 'express';
import Url = require('url');

namespace HostInfo {

  'use strict';

  export function getHost(req: Request): string {
    const host = getOrigin(req) || '';
    if (host) { return Url.parse(host).host; }
    return host;
  }

  export function getIp(req: Request): string {
    const headers: any = req.headers || {},
          connection: any = req.connection || {};
    return headers['x-forwarded-for'] || connection.remoteAddress || '';
  }

  export function getOrigin(req: Request): string {
    const headers: any = req.headers || {};
    return headers.referer || req.get('origin');
  }

  export function getIdentFromHost(req: Request): string {
    const host: any = getHost(req);
    switch (host) {
      case 'localhost:8080': return null;
    }
    return null;
  }

}

export = HostInfo;
