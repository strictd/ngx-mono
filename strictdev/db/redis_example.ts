import * as Redis from 'ioredis';

export class DB {
  private static _DB: Redis;
  private static _CONFIG = {
    port: 6379,
    ip: '127.0.0.1'
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
      if (config.client) { this._DB = config.client; }
    } catch (_e) { }
  }

  private static defineErrorHandler() {
    this._DB.on('error', (e) => {
      this.redis.disconnect();
      this.redis.quit();
      setTimeout(function() { this._DB = null; }, 3000);
      console.log('ERROR: %O', e);
    });
  }

  private static defineCloseHandler() {
    this._DB.on('close', (e) => {
      console.log('REDIS Closed %O', e);
    });
  }

  public static get redis(): Redis {
    if (!this._DB) {
      this._DB = new Redis(this._CONFIG.port, this._CONFIG.ip);
      this.defineErrorHandler();
      this.defineCloseHandler();
    }
    return this._DB;
  }
}
