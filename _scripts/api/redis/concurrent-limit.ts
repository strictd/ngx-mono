'use strict';

// Based on https://gist.github.com/ptarjan/e38f45f2dfe601419ca3af937fff574d

import * as Redis from 'ioredis';
const debug = require('debug')('concurrent-limit');

const _TTL = 60,
      _CAPACITY = 100;

class ConcurrentLimit {
  private static _DB: Redis;
  private static _CONFIG = {
    port: 6379,
    ip: '127.0.0.1',
    ttl: _TTL,
    capacity: _CAPACITY
  }

  public static set config(config: any) {
    try {
      Object.keys(config).map(k => {
        if (this._CONFIG.hasOwnProperty(k)) {
          this._CONFIG[k] = config[k];
        }
      });
    } catch (_e) { }
    try {
      if (config.client) {
        this._DB = config.client;
        this.defineRater();
      }
    } catch (_e) { }
  }
  public static get redis(): Redis {
    if (!this._DB) {
      this._DB = new Redis(this._CONFIG.port, this._CONFIG.ip);
      this.defineRater();
      this.defineErrorHandler();
      this.defineCloseHandler();
    }
    return this._DB;
  }

  private static defineErrorHandler() {
    this._DB.on('error', (e) => {
      this.redis.disconnect();
      this.redis.quit();
      setTimeout(function() { this._DB = null; }, 3000);
      debug('ERROR: %O', e);
    });
  }

  private static defineCloseHandler() {
    this._DB.on('close', (e) => {
      debug('REDIS Closed %O', e);
    });
  }
  private static defineRater() {
    this._DB.defineCommand('this', {
      numberOfKeys: 1,
      lua: `
local key = KEYS[1]

local capacity = tonumber(ARGV[1])
local timestamp = tonumber(ARGV[2])
local id = ARGV[3]

local count = redis.call("zcard", key)
local allowed = count < capacity

if allowed then
  redis.call("zadd", key, timestamp, id)
end

return { allowed, count }
    `
    });
  }

  public static check(id, token) {
    return new Promise((resolve, reject) => {
      const timestamp = Math.floor(new Date().getTime() / 1000),
            key = 'concurrent_requests_limiter' + ((id) ? '.' + id : '');

      try {
        this.redis.zremrangebyscore(key, '-inf', timestamp - this._CONFIG.ttl);
      } catch (_e) { return resolve([1, 0]); }

      const keys = [key];
      const args = [this._CONFIG.capacity, timestamp, token];

      this.redis.this(keys, args, (err, result) => {
        if (err || !result.length) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  public static post_request_bookkeeping(id, token) {
    if (!token) { return; }

    debug('Bookkeeping: %s - %s', id, token);
    const key = 'concurrent_requests_limiter' + ((id) ? '.' + id : '');
    this.redis.zrem(key, token);
  }
}

module.exports = function(options) {
  return function (req, res, next) {
    const id = options.id || req.headers['x-forwarded-for'] || req.connection.remoteAddress || '',
          token = Math.random().toString(36).substring(7);

    let returnToken: string;

    ConcurrentLimit.config = options;

    req.on('close', () => ConcurrentLimit.post_request_bookkeeping(id, returnToken));
    req.on('end', () => ConcurrentLimit.post_request_bookkeeping(id, returnToken));

    ConcurrentLimit.check(id, token).then((result: any) => {
      debug('Concurrent Result: %O', result);
      if (!result.length || !result[0]) {
        res.status(429).send('Concurrent Limit Exceeded');
      } else {
        returnToken = token;
        next();
      }
    }).catch(err => {
      next();
      // res.status(500).send(err);
    });
  }
}
