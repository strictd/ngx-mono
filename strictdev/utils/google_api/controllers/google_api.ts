import { get as httpGet, request as httpRequest } from 'https';
import { sign as jwt_sign } from 'jsonwebtoken';
import { stringify as querystring_stringify } from 'querystring';
import { readFileSync } from 'fs';
import { resolve as path_resolve, dirname as path_dirname, isAbsolute } from 'path';
import minimist = require('minimist');

class GoogleTokens {
  private _API_TOKEN = '';
  private _API_TOKEN_EXPIRES = 0;
  private _token_promise: Promise<any>;
  private _timer: any;

  constructor() {
    this.getToken().then(d => {}).catch(e => console.log('Token Error: ', JSON.stringify(e)));
    this.setTimer();
  }

  public get token(): Promise<string> {
    if (this._API_TOKEN !== '' && this._API_TOKEN_EXPIRES > ((Date.now() / 1000) + 3300)) {
      // console.log('Reusing', this._API_TOKEN_EXPIRES, ((Date.now() / 1000) + 3300));
      return Promise.resolve(this._API_TOKEN);
    }

    if (this._token_promise) {
      // console.log('Token Promise');
      return this._token_promise;
    }

    // console.log('Fetching New Token');
    return this.getToken();
  }

  private setTimer() {
    try { clearInterval(this._timer); } catch (e) {}
    this._timer = setInterval(this.getToken, 3300 * 1000);
  }

  private getToken(): Promise<string> {
    const args: any = minimist(process.argv);

    if (process.env.GOOGLE_API_CERT && !isAbsolute(process.env.GOOGLE_API_CERT)) { process.env.GOOGLE_API_CERT = path_resolve(__dirname, process.env.GOOGLE_API_CERT); }

    const cert_email = args.google_api_email || process.env.GOOGLE_API_EMAIL || '',
          cert_pem = args.google_api_cert || process.env.GOOGLE_API_CERT || '';

    this._token_promise = new Promise((resolve, reject) => {
      let cert: Buffer;
      try { cert = readFileSync(cert_pem); } catch (e) {} // get private key
      const token_exp = Math.floor(Date.now() / 1000) + 3600;
      const token = jwt_sign({
        iss: cert_email,
        scope: 'https://www.googleapis.com/auth/spreadsheets',
        aud: 'https://www.googleapis.com/oauth2/v4/token',
        exp: token_exp,
        iat: Math.floor(Date.now() / 1000)
      },
      cert,
      { algorithm: 'RS256'});

      const postData = querystring_stringify({
        'grant_type': 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        'assertion': token
      });

      const options = {
        hostname: 'www.googleapis.com',
        port: 443,
        path: '/oauth2/v4/token',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(postData)
        }

      };


      let data = '';
      const req = httpRequest(options, (res) => {
        res.setEncoding('utf8');
        res.on('data', (d) => {
          data = `${data}${d}`;
        });
        res.on('end', () => {
          const resp = JSON.parse(data);
          if (resp.error) {
            reject(`${resp.error}\n${resp.error_description}`);
            this._token_promise = null;
          } else {
            this._API_TOKEN = resp.access_token;
            this._API_TOKEN_EXPIRES = token_exp;
            resolve(resp.access_token);
            this._token_promise = null;
          }
        });
      });

      req.on('error', (e) => {
        reject(e);
        this._token_promise = null;
      });

      req.write(postData);
      req.end();
    });

    return this._token_promise;
  }
}

export class GoogleRequests {
  private _tokens: GoogleTokens;
  constructor() {
    this._tokens = new GoogleTokens();
  }

  public batchGetRange(sheetid: string, range: string[], majorDimension = 'ROWS'): Promise<any> {
    return this._tokens.token.then(token => {
      const ranges = range.map(r => `ranges=${encodeURIComponent(r)}`).join('&');
      const url = `/v4/spreadsheets/${encodeURIComponent(sheetid)}/values:batchGet?majorDimension=${encodeURIComponent(majorDimension)}&${ranges}`;
      return this.getRequest(token, 'sheets.googleapis.com', url);
    });
  }

  public getRange(sheetid: string, range: string, majorDimension = 'ROWS'): Promise<any> {
    return this._tokens.token.then(token => {
      const url = `/v4/spreadsheets/${encodeURIComponent(sheetid)}/values/${encodeURIComponent(range)}?majorDimension=${encodeURIComponent(majorDimension)}`;
      return this.getRequest(token, 'sheets.googleapis.com', url);
    });
  }

  public appendRow(sheetid: string, range: string, values: any) {
    return this._tokens.token.then(token => {
      const url = `/v4/spreadsheets/${encodeURIComponent(sheetid)}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
      return this.postRequest(token, 'sheets.googleapis.com', url, values);
    });
  }

  private getRequest(token: string, host: string, url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: host,
        port: 443,
        path: url,
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      };

      let data = '';
      const req = httpRequest(options, (res) => {
        res.setEncoding('utf8');
        res.on('data', (d) => {
          data = `${data}${d}`;
        });
        res.on('end', () => {
          resolve(data);
        });
      });

      req.on('error', (e) => {
        reject(e);
      });

      req.end();
    });
  }

  private postRequest(token: string, host: string, url: string, post: any): Promise<any> {
    return new Promise((resolve, reject) => {

      const postData = JSON.stringify(post);

      const options = {
        hostname: host,
        port: 443,
        path: url,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        }

      };

      let data = '';
      const req = httpRequest(options, (res) => {
        res.setEncoding('utf8');
        res.on('data', (d) => {
          data = `${data}${d}`;
        });
        res.on('end', () => {
          resolve(data);
        });
      });

      req.on('error', (e) => {
        reject(e);
      });
      req.write(postData);
      req.end();
    });
  }
}
