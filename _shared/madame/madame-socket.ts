import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';

import { IServerList, IServerInfo } from './models/madame';
import { MadameService } from './madame-service';

declare const io: any;

@Injectable()
export class MadameSocket extends MadameService {
  public sockets: any = {};
  public initFuncs: any = [];
  public serverList: IServerList = {
    'main': {
      'url': 'http://localhost:3000',
      'host': document.location.host,
      'cookie': document.cookie
    }
  };

  setServer(server: string, url: string, host?: string, cookie?: string): void {
    if (url.trim().slice(-1) === '/' || url.trim().slice(-1) === '\\') { url = url.substring(0, url.length - 1); }

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

  openSocket(server = 'main', jwt?: string) {
    const _t = this;

    this.sockets[server] = {};
    this.sockets[server].io = io.connect(this.serverList[server].url, {
      'reconnection': true,
      'reconnectionDelay': 1000,
      'reconnectionAttempts': 10
    });
    this.sockets[server].calls = {};


    for (const socket in this.sockets) {
      if (!this.sockets.hasOwnProperty(socket)) { continue; }

      this.sockets[socket].connect = Rx.Observable.create(function(observer: Observer<any>) {
        const ob = observer;
        _t.sockets[socket].io.on('connect', function() { ob.next(true); });
      });

      this.sockets[socket].auth = Rx.Observable.create(function(observer: Observer<any>) {
        _t.sockets[socket].io.on('auth', function(data: any) { observer.next(data); });
      });



      // console.log('load socket: ', socket);
      this.sockets[socket].connect.subscribe(() => {
        _t.sockets[socket].io.on('authenticated', function () {

        })
        .emit('authenticate', { token: jwt });
      });

      // this.sockets[socket].connect.subscribe(() => _t.sockets[socket].io.emit('authenticate', {host: this.serverList[server].host, cookie: this.serverList[server].cookie }));
      this.sockets[socket].auth.subscribe((data: any) => {
        console.log('We have authed', data);
      });


/*
      this.sockets[socket].io.on('authfail', function() {
        console.log('Authentication Failure');
      });
      this.sockets[socket].io.on('connect_error', function(data) {
        console.log('Connect Error', arguments);
      });

      this.sockets[socket].io.on('connect_timeout', function() {
        console.log('Connect Timeout', arguments)
      });
      this.sockets[socket].io.on('reconnect', function(data) {
        console.log('Reconnect', arguments);
      });
      this.sockets[socket].io.on('reconnect_attempt', function() {
        console.log('Reconnect Attempt', arguments);
      });
      this.sockets[socket].io.on('reconnect_error', function(data) {
        console.log('Reconnect Error', arguments);
      });
      this.sockets[socket].io.on('reconnect_failed', function() {
        console.log('Reconnect Failed', arguments);
      });

      this.sockets[socket].io.on('error', function() {
        console.log('Error', arguments);
      });
      this.sockets[socket].io.on('connect', function() {
        console.log('Connect', arguments);
      });
      this.sockets[socket].io.on('disconnect', function() {
        console.log('Disconnect', arguments);
      });
*/
      this.sockets[socket].io.on('socketReturn', function(cbData: any) {
        // console.log('Return Socket', _t.sockets[socket].calls, cbData);
        if (typeof cbData === 'undefined' || typeof cbData.socketTag === 'undefined') { return; }
        if (typeof _t.sockets[socket].calls[cbData.socketTag] === 'undefined') { return; }
        if (typeof _t.sockets[socket].calls[cbData.socketTag].callback !== 'undefined') { _t.sockets[socket].calls[cbData.socketTag].callback.apply(_t.sockets[socket], arguments); }
        delete _t.sockets[socket].calls[cbData.socketTag];
      });
      this.sockets[socket].io.on('socketFail', function(cbData: any) {
        if (typeof cbData === 'undefined' || typeof cbData.socketTag === 'undefined') { return; }
        if (typeof _t.sockets[socket].calls[cbData.socketTag] === 'undefined') { return; }
        if (typeof _t.sockets[socket].calls[cbData.socketTag].callfail !== 'undefined') { _t.sockets[socket].calls[cbData.socketTag].callfail.apply(_t.sockets[socket], arguments); }
        delete _t.sockets[socket].calls[cbData.socketTag];
      });
    }

  }

  emit(socket: string, eventName: string, data: any, _cb: Function = null, _cbfail: Function = null) {
    if (typeof data.socketTag === 'undefined') { data.socketTag = 'b' + this.s4() + this.s4() + this.s4(); }
    this.sockets[socket].calls[data.socketTag] = {};
    if (!!_cb) { this.sockets[socket].calls[data.socketTag].callback = _cb; }
    if (!!_cbfail) { this.sockets[socket].calls[data.socketTag].callfail = _cbfail; }
    this.sockets[socket].io.emit(eventName, data, function () { alert('Failed To Emit'); });
  }
//  on() { }
//  removeAllListeners() { }

  s4() { return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1); }

}
