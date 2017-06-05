import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/of';

import { CanActivate } from '@angular/router';

import { tokenNotExpired } from 'angular2-jwt';

import { LoginCmd } from './login-service';

@Injectable()
export class AuthGuard implements CanActivate {

  forceObservable: Observable<any>;
  forceObserver: Observer<any>;

  constructor() { }

  canActivate() {

    if (tokenNotExpired('jwt')) {
      // Good Auth
      return Observable.of(true);
    }

    // Not so good Auth
    this.forceObservable = new Observable((observer: Observer<any>) => {
      this.forceObserver = observer;
      LoginCmd._forceLoginObserver.next(this.forceObserver); // Fire login Modal
    });
    return this.forceObservable;
  }

}
