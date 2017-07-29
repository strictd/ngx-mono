import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';
import { IServerInfo, IServerList, IHeaderList, IMadameQuery,
         IMadameQue } from './models/madame';

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
  authHttp: AuthHttp;

  loginObserv: Observer<any>;

  madameInterval: Observable<any>;
  runningQue = false;
  madameCounter = 0;

  _que: Observable<any>;
  que: Observer<any>;
  queStash: IMadameQue[] = [];
  _needsAuth: Observer<boolean>;
  needsAuth: Observable<any>;
  _runningCount = 0;
  _running: Observer<boolean>;
  running: Observable<any>;

  reauthObservable: Observable<any>;

  constructor(_http: Http, _authHttp: AuthHttp) {
    this.http = _http;
    this.authHttp = _authHttp;

    this._que = new Observable((observer: Observer<any>) => {
      this.que = observer;
    }).share();

    this._que.subscribe((que: IMadameQue) => {
      this.tryQue(que);
    });

    this.needsAuth = new Observable((observer: Observer<any>) => {
      this._needsAuth = observer;
    }).share();

    this.running = new Observable((observer: Observer<any>) => {
      this._running = observer;
    }).share();

  }


  setServer(server: string, url: string, host?: string, cookie?: string): void {
    if (url.trim().slice(-1) === '\\') { url = url.substring(0, url.length - 1); }
    if (url.trim().slice(-1) !== '/') { url += '/'; }

    this.serverList[server] = this.initServer(url, host, cookie);
  }
  initServer(url?: string, host?: string, cookie?: string): IServerInfo {
    return {
      'url': (typeof url !== 'undefined') ? url : '',
      'host': (typeof host !== 'undefined') ? host : '',
      'cookie': (typeof cookie !== 'undefined') ? cookie : ''
    };
  }

  setHost(server: string, host: string, cookie?: string): void {
    this.serverList[server].host = host;
    if (typeof cookie !== 'undefined') { this.setCookie(server, cookie); }
  }
  setCookie(server: string, cookie: string): void {
    this.serverList[server].cookie = cookie;
  }

  setLoginObserver(observer: Observer<any>): void {
    this.loginObserv = observer;
  }

  getAuthHook(): Observable<boolean> {
    return this.needsAuth;
  }

  getRunningHook(): Observable<boolean> {
    return this.running;
  }

  getServers(): IServerList {
    return this.serverList;
  }

  getServer(server: string): IServerInfo {
    if (this.serverList.hasOwnProperty(server)) { return this.serverList[server]; }
    const serverKeys = Object.keys(this.serverList);
    if (serverKeys.length) { return this.serverList[serverKeys[0]]; }
    return null;
  }

  getURL(server: string): string {
    const serv = this.getServer(server);
    if (serv) { return this.serverList[server].url;
    } else { return ''; }
  }
  getCookie(server: string): string {
    return this.serverList[server].cookie;
  }
  getHost(server: string): string {
    return this.serverList[server].host;
  }


  get(url: string, server = 'main', headers?: IHeaderList): Observable<Response> {
    const serverInfo: IServerInfo = this.getServer(server) || this.initServer();
    return this.http.get(`${serverInfo.url}${url}`, {headers: this.defaultHeaders(headers)});
  }

  post(url: string, data: Object, server = 'main', headers?: IHeaderList): Observable<Response> {
    const serverInfo: IServerInfo = this.getServer(server) || this.initServer();
    return this.http.post(`${serverInfo.url}${url}`, JSON.stringify(data), {headers: this.defaultHeaders(headers)});
  }

  put(url: string, data: Object, server = 'main', headers?: IHeaderList): Observable<Response> {
    const serverInfo: IServerInfo = this.getServer(server) || this.initServer();
    return this.http.put(`${serverInfo.url}${url}`, JSON.stringify(data), {headers: this.defaultHeaders(headers)});
  }

  delete(url: string, server = 'main', headers?: IHeaderList): Observable<Response> {
    const serverInfo: IServerInfo = this.getServer(server) || this.initServer();
    return this.http.delete(`${serverInfo.url}${url}`, {headers: this.defaultHeaders(headers)});
  }

  authGet(url: string, server = 'main', headers?: IHeaderList): Observable<Response> {
    const serverInfo: IServerInfo = this.getServer(server) || this.initServer();
    return this.authHttp.get(`${serverInfo.url}${url}`, {headers: this.defaultHeaders(headers)});
  }

  authPost(url: string, data: Object, server = 'main', headers?: IHeaderList): Observable<Response> {
    const serverInfo: IServerInfo = this.getServer(server) || this.initServer();
    return this.authHttp.post(`${serverInfo.url}${url}`, JSON.stringify(data), {headers: this.defaultHeaders(headers)});
  }

  authPut(url: string, data: Object, server = 'main', headers?: IHeaderList): Observable<Response> {
    const serverInfo: IServerInfo = this.getServer(server) || this.initServer();
    return this.authHttp.put(`${serverInfo.url}${url}`, JSON.stringify(data), {headers: this.defaultHeaders(headers)});
  }

  authDelete(url: string, server = 'main', headers?: IHeaderList): Observable<Response> {
    const serverInfo: IServerInfo = this.getServer(server) || this.initServer();
    return this.authHttp.delete(`${serverInfo.url}${url}`, {headers: this.defaultHeaders(headers)});
  }


  createAuthQueryFromMethod(query: IMadameQuery): Observable<Response> {
    let url = query.url;
    if (!!query.query_string && Object.keys(query.query_string).length) {
      url = `${url}?${this.queryString(query.query_string)}`;
    }

    if (query.method === 'put') {
      return this.authPut(url, query.data, query.server, query.headers);
    } else if (query.method === 'post') {
      return this.authPost(url, query.data, query.server, query.headers);
    } else if (query.method === 'delete') {
      return this.authDelete(url, query.server);
    } else {
      return this.authGet(url, query.server, query.headers);
    }
  }

  queueMadame(query: IMadameQuery) {
    return Observable.create((observer: Observer<any>) => {
      const userQue = <IMadameQue>{
        query: query,
        observer: observer
      };
      // if (tokenNotExpired('jwt')) {
        this.que.next(userQue);
      // } else {
      //   this.queStash.push(userQue);
      //   this.reauthMadame();
      // }
    });
  }

  tryQue(que: IMadameQue) {
    const authQuery = this.createAuthQueryFromMethod(que.query);
    que.running = true;
    this.updateRunningCount(1);

    authQuery.subscribe(
      resp => {
        que.running = false;
        this.updateRunningCount(-1);

        if (resp.status === 401) {
          que.error = '401';
          this.queStash.unshift(que);
          this.reauthMadame();
        } else {
          que.observer.next(resp);
          que.observer.complete();
        }
      }, err => {
        que.running = false;
        this.updateRunningCount(-1);

        if (err.status === 401) {
          que.error = '401';
          this.queStash.unshift(que);
          this.reauthMadame();
        } else {
          que.error = err;
          que.observer.error(err);
          que.observer.complete();
        }
      }
    );
  }

  rerunQueStash() {
    this.reauthObservable = null;
    if (!this.queStash.length) { return; }

    do {
      const q = this.queStash.shift();
      this.tryQue(q);
    } while (!this.reauthObservable && this.queStash !== void 0 && this.queStash.length);
  }

  reauthMadame() {
    if (this.reauthObservable) { return; }

    this.reauthObservable = Observable.create((observ: Observer<any>) => {
      this.loginObserv.next(observ);
    });

    this.reauthObservable.subscribe(
      resp => {
        if (resp === true) {
          this._needsAuth.next(false);
          this.rerunQueStash();
        } else {
          this._needsAuth.next(true);
        }
      },
      () => {
        this.reauthMadame();
      },
      () => {
        this.reauthObservable = null;
      }
    );
  }

  updateRunningCount(by: number) {
    this._runningCount += by;
    if (this._runningCount === 1) {
      this._running.next(true);
    } else if (this._runningCount === 0) { this._running.next(false); }
  }


  clearQue() {
    this.queStash.map(q => {
      q.observer.complete();
    });
    this.queStash = [];

    this.updateRunningCount(this._runningCount - (this._runningCount * 2));
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
