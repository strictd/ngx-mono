import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { MadameAuth } from '../../../../../_shared/madame/madame-auth';
import { MetaService } from '@ngx-meta/core';
import { Subscription } from 'rxjs/Subscription';

import { LoginCmd } from '../../../../../_shared/login/providers/login-service';
import { ConfigApp } from '../../../../../_shared/config/config.app';
import { ProfileApp } from '../../../../../_shared/config/profile.app';
import { PermissionsApp } from '../../../../../_shared/config/permissions.app';

declare var ga: any;

/*
 * App Component
 * Top Level Component
 */

@Component({
  selector: 'app-component',
  template: `
  <login-modal></login-modal>
  <router-outlet></router-outlet>`,
  styleUrls: [ '../styles/app.css'.toString() ]
})

export class App implements OnInit, OnDestroy {
  service: MadameAuth;
  router: Router;
  route: ActivatedRoute;
  profile: ProfileApp;
  metaService: MetaService;

  showHeader = true;
  showNavbar = true;
  headerLink = ['/'];

  localAppLogout: Subscription;
  localAppLogin: Subscription;
  // localMadameStash: Subscription;
  localRunningHook: Subscription;

  constructor(
    _config: ConfigApp,
    _metaService: MetaService,
    _profile: ProfileApp,
    _permissions: PermissionsApp,
    _service: MadameAuth,
    _router: Router,
    _route: ActivatedRoute
  ) {
    this.service = _service;
    this.profile = _profile;
    this.router = _router;
    this.metaService = _metaService;

    _service.setServer('main', _config.madameService());
    // this.socket.setServer('main', _config.madameSocket());

    _config.setStateParams();

    // Fetches Auth hook for authorizing and resending stashed que
    // this.localMadameStash = _service.getAuthHook().subscribe(
    //   (resp: boolean) => this.processNeedMoreAuthSub(resp),
    //   (err) => alert(err)
    // );

    // Setup Profile
    if (this.profile.profile && this.profile.profile.permissions) {
      PermissionsApp._permissionObserver.next(this.profile.profile.permissions);
    }

    // Set madames cursor wait when running;
    this.localRunningHook = _service.getRunningHook().subscribe(
      (isRunning: boolean) => this.processRunningSub(isRunning)
    );

    this.localAppLogin = LoginCmd._loggedInObservable.subscribe((_t: string) => {
      if (this.profile.profile && this.profile.profile.permissions) {
        PermissionsApp._permissionObserver.next(this.profile.profile.permissions);
      }
    });

    this.localAppLogout = LoginCmd._loggedOutObservable.subscribe((_t: any) => {
      // this.profile = {};
      _router.navigateByUrl('/');
    });

    if (window.opener) {
      this.showNavbar = false;
      this.headerLink = null;
    }

  }

  ngOnInit() {
    // Set madames login modal stream trigger
    this.service.setLoginObserver(LoginCmd._forceLoginObserver);

    this.router.events.distinctUntilChanged((previous: any, current: any) => {
      if (current instanceof NavigationEnd) {
        return previous.url === current.url;
      }
      return true;
    }).subscribe((x: any) => {
      ga('set', 'page', x.url);
      ga('send', 'pageview');
      window.scrollTo(0, 0);
    });
  }

  ngOnDestroy() {
    this.localAppLogout.unsubscribe();
    this.localAppLogin.unsubscribe();
    // this.localMadameStash.unsubscribe();
    this.localRunningHook.unsubscribe();
  }

  logout() {
    LoginCmd._loggedOutObserver.next(this);
  }

  processRunningSub(isRunning: boolean) {
    if (isRunning) {
      document.body.style.cursor = 'wait';
    } else {
      document.body.style.cursor = 'default';
    }
  }

}
