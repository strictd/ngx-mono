import { Injectable, OnDestroy } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { plainToClass } from 'class-transformer';

import { IProfileJWT } from './models/i-profile-jwt';
import { ConfigApp } from './config.app';

import 'rxjs/add/operator/share';

@Injectable()
export class ProfileApp implements OnDestroy {
  static _profileObserver: Observer<IProfileJWT>;
  static _profileObservable = new Observable((observer: Observer<IProfileJWT>) => {
    ProfileApp._profileObserver = observer; // Assign to static ProfileApp._profileObserver
  }).share();

  private jwt: JwtHelper;

  private localToken: Subscription;

  private hasLocal = ConfigApp.isLocalStorageNameSupported();

  public profile: IProfileJWT;
  public isLoggedIn = false;

  constructor(_jwt: JwtHelper) {
    this.jwt = _jwt;
    this.setProfile(this.token);

    this.localToken = ProfileApp._profileObservable.subscribe(
      () => {}
    );
  }

  ngOnDestroy() {
    this.localToken.unsubscribe();
  }

  setProfile(value: any) {
    let decoded = {};
    try {
      if (!this.jwt.isTokenExpired(value)) {
        decoded = this.jwt.decodeToken(value);
        this.isLoggedIn = true;
        this.profile = plainToClass(IProfileJWT, decoded as Object);
      } else { this.isLoggedIn = false; }
    } catch (e) {
      this.isLoggedIn = false;
      this.profile = plainToClass(IProfileJWT, {} as Object);
    }

    // ProfileApp._profileObserver.next(this._profile);
  }

  set token(value: string) {
    if (value && this.hasLocal) {
      localStorage.setItem('jwt', value);
    } else if (value) {
      ConfigApp.setCookie('jwt', value, 7);

    } else if (this.hasLocal) {
      localStorage.removeItem('jwt');
    } else {
      ConfigApp.setCookie('jwt', '', -1);
    }

    this.setProfile(value);
  }

  get token(): string {
    if (this.hasLocal) {
      return localStorage.getItem('jwt');
    } else {
      return ConfigApp.getCookie('jwt');
    }
  }
}
