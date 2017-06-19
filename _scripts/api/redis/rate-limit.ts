'use strict';

// Based on https://gist.github.com/ptarjan/e38f45f2dfe601419ca3af937fff574d

import * as Redis from 'ioredis';
const debug = require('debug')('rate-limit');

const _REPLENISH_RATE = 100,
      _BURST = 1;

class RateLimit {
  private static _DB: Redis;
  private static _CONFIG = {
    port: 6379,
    ip: '127.0.0.1',
    replenish_rate: _REPLENISH_RATE,
    burst: _BURST
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
    this._DB.defineCommand('ratelimit', {
      numberOfKeys: 2,
      lua: `
local tokens_key = KEYS[1]
local timestamp_key = KEYS[2]

local rate = tonumber(ARGV[1])
local capacity = tonumber(ARGV[2])
local now = tonumber(ARGV[3])
local requested = tonumber(ARGV[4])

local fill_time = capacity/rate
local ttl = math.floor(fill_time*2)

local last_tokens = tonumber(redis.call("get", tokens_key))
if last_tokens == nil then
last_tokens = capacity
end

local last_refreshed = tonumber(redis.call("get", timestamp_key))
if last_refreshed == nil then
last_refreshed = 0
end

local delta = math.max(0, now-last_refreshed)
local filled_tokens = math.min(capacity, last_tokens+(delta*rate))
local allowed = filled_tokens >= requested
local new_tokens = filled_tokens
if allowed then
new_tokens = filled_tokens - requested
end

redis.call("setex", tokens_key, ttl, new_tokens)
redis.call("setex", timestamp_key, ttl, now)

return { allowed, new_tokens }
    `
    });
  }

  public static check(id) {
    const prefix = 'request_rate_limiter' + (id) ? '.' + id : '';

    // You need two Redis keys for Token Bucket.
    const keys = [
      prefix + '.tokens',
      prefix + '.timestamp'
    ]

    // The arguments to the LUA script. time() returns unixtime in seconds.
    const args = [
      this._CONFIG.replenish_rate,
      this._CONFIG.burst * this._CONFIG.replenish_rate,
      Math.floor(new Date().getTime() / 1000),
      1
    ];

    return new Promise((resolve, reject) => {
      this.redis.ratelimit(keys, args, (err, result) => {
        if (err || !result.length) {
          reject(err);
        } else { resolve(result); }
      });
    });
  }
}

module.exports = function(options) {
  return function (req, res, next) {
    const id = options.id || req.headers['x-forwarded-for'] || req.connection.remoteAddress || '';
    RateLimit.config = options;

    RateLimit.check(id).then((tokens: any) => {
      debug('Tokens: %O', tokens);
      if (!tokens.length || !tokens[0]) {
        res.status(429).send('Rate Limit Exceeded');
      } else { next(); }
    }).catch(err => {
      debug('Error %O', err);
      next();
      // res.status(500).send(err);
    });
  }
}
