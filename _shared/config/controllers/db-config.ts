import * as HostInfo from './host-info';
import { Request } from 'express';

namespace DbConfig {
  'use strict';

  export const default_limit = 25;

  export function fetchLocationsMap(sources = [], locations = '') {
    if (!locations && sources.length) {
      return [sources[0]]
    } else if (locations && sources.length) {
      const locSet = locations.split(',').
             filter(loc => sources.find(source => source.store_id === loc.toLowerCase()));
      if (locSet.length) {
        return locSet.map(loc => sources.find(source => source.store_id === loc.toLowerCase()));
      } else {
        return [sources.find(source => source.store_id === '')];
      }
    } else {
      return sources;
    }
  }

  export function fetchSource(req: Request, _sources = []) {
    const sources = fetchLocationsMap(_sources, HostInfo.getIdentFromHost(req));
    if (!sources.length) { throw {'err': 'No Database Specified for your host'}; }
    return sources[0];
  }

}

export = DbConfig;
