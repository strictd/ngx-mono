import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';

import { IServerInfo, IServerList, IHeaderList } from './models/madame';

import 'rxjs/add/operator/share';

@Injectable()
export class MadameService {
  serverList: IServerList = {
    'main': {
      'url': 'http://localhost:3000/',
      'host': document.location.host,
      'cookie': document.cookie
    }
  };

  http: Http;

  _running: Observer<boolean>;
  running: Observable<any>;

  constructor(_http: Http) {
    this.http = _http;

    this.running = new Observable((observer: Observer<any>) => {
      this._running = observer;
    }).share();

  }


  setServer(server: string, url: string, host?: string, cookie?: string): void {
    if (url.trim().slice(-1) === '\\') { url = url.substring(0, url.length - 1); }
    if (url.trim().slice(-1) !== '/') { url += '/'; }

    this.serverList[server].url = url;
    if (typeof host !== 'undefined') { this.setHost(server, host); }
    if (typeof cookie !== 'undefined') { this.setCookie(server, cookie); }
  }
  setHost(server: string, host: string, cookie?: string): void {
    this.serverList[server].host = host;
    if (typeof cookie !== 'undefined') { this.setCookie(server, cookie); }
  }
  setCookie(server: string, cookie: string): void {
    this.serverList[server].cookie = cookie;
  }

  getRunningHook(): Observable<boolean> {
    return this.running;
  }

  getServers(): IServerList {
    return this.serverList;
  }
  getServer(server: string): IServerInfo {
    return this.serverList[server];
  }
  getURL(server: string): string {
    return this.serverList[server].url;
  }
  getCookie(server: string): string {
    return this.serverList[server].cookie;
  }
  getHost(server: string): string {
    return this.serverList[server].host;
  }

  get(url: string, server = 'main', headers?: IHeaderList): Observable<Response> {
    return this.http.get(`${this.getURL(server)}${url}`, {headers: this.defaultHeaders(headers)});
  }

  post(url: string, data: Object, server = 'main', headers?: IHeaderList): Observable<Response> {
    return this.http.post(`${this.getURL(server)}${url}`, JSON.stringify(data), {headers: this.defaultHeaders(headers)});
  }

  put(url: string, data: Object, server = 'main', headers?: IHeaderList): Observable<Response> {
    return this.http.put(`${this.getURL(server)}${url}`, JSON.stringify(data), {headers: this.defaultHeaders(headers)});
  }

  delete(url: string, server = 'main', headers?: IHeaderList): Observable<Response> {
    return this.http.delete(`${this.getURL(server)}${url}`, {headers: this.defaultHeaders(headers)});
  }


  defaultHeaders(toAdd?: IHeaderList): Headers {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    if (toAdd) { headers = this.addHeaders(toAdd, headers); }
  return headers;
  }
  addHeaders(toAdd: IHeaderList, cur?: Headers ): Headers {
    if (!cur) { cur = new Headers(); }

    for (const h in toAdd) {
      if (toAdd.hasOwnProperty(h)) {
        cur.append(toAdd[h].key, toAdd[h].val);
      }
    }
    return cur;
  }
  queryString(obj: any): string {
    const str: any[] = [];
    for (const p in obj) {
      if (obj.hasOwnProperty(p) && typeof obj[p] !== 'undefined') {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p].toString()));
      }
    }
    return str.join('&');
  }
}
