import { plainToClass } from 'class-transformer';

import { Injectable, OnDestroy } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { MadameService } from '@strictd/madame/dist/madame-service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { Subscription } from 'rxjs/Subscription';
import { ILogin, ILoginResponse, ILoginToken } from '../models/i-login';

import { ConfigApp } from '../../config/config.app';
import { ProfileApp } from '../../config/profile.app';

import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
  madame: MadameService;
  runningLogin = false;

  constructor(
    _config: ConfigApp,
    _madame: MadameService,
  ) {
    this.madame = _madame;
    _madame.setServer('main', _config.madameService());
  }

  doLogin(login_info: ILogin): Promise<string> {
    return new Promise((resolve, reject) => {
      this.madame.
          post('sessions/create', login_info).
          map(res => plainToClass(ILoginResponse, res as Object)).
          subscribe(
      (resp: ILoginResponse) => {
        const dataSet = plainToClass(ILoginToken, JSON.parse(resp._body) as Object);

        if (typeof dataSet.id_token !== 'undefined') {
          LoginCmd._loggedInObserver.next(dataSet.id_token);
          resolve(dataSet.id_token);
        } else {
          reject('');
        }
      });
    });
  }

  doLogoff() {
    localStorage.removeItem('jwt');
  }

}

@Injectable()
export class LoginCmd implements OnDestroy {
  static _loggedInObserver: Observer<any>;
  static _loggedInObservable = new Observable((observer: Observer<any>) => {
   LoginCmd._loggedInObserver = observer; // Assign to static App._loggedInObserver
  }).share();

  static _loggedOutObserver: Observer<any>;
  static _loggedOutObservable = new Observable((observer: Observer<any>) => {
   LoginCmd._loggedOutObserver = observer; // Assign to static App._loggedOutObserver
  }).share();

  static _forceLoginObserver: Observer<any>;
  static _forceLoginObservable = new Observable((observer: Observer<any>) => {
   LoginCmd._forceLoginObserver = observer; // Assign to static
                                       // App._loggedOutObserver
  }).share();

  tokenLogin: Subscription;
  localAppLogout: Subscription;
  localForceLogin: Subscription;

  constructor(_profile: ProfileApp, _jwt: JwtHelper) {
    // Set Token on login
    this.tokenLogin = LoginCmd._loggedInObservable.subscribe(
      (_token: string) => {}
    );
    // this.socket.openSocket('main', decoded);

    this.localAppLogout = LoginCmd._loggedOutObservable.subscribe(
      () => _profile.token = ''
    );

    this.localForceLogin = LoginCmd._forceLoginObservable.subscribe(
      (_token: string) => {}
    );
  }

  ngOnDestroy() {
    this.tokenLogin.unsubscribe();
    this.localAppLogout.unsubscribe();
    this.localForceLogin.unsubscribe();

    LoginCmd._loggedInObserver.complete();
    LoginCmd._loggedOutObserver.complete();
    LoginCmd._forceLoginObserver.complete();
  }
}
