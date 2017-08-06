import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { MetaService } from '@ngx-meta/core';
import 'rxjs/add/operator/distinctUntilChanged';

import { ConfigApp } from '../../../../../_shared/config/config.app';

declare var ga: any;

/*
 * App Component
 * Top Level Component
 */

@Component({
  selector: 'app-component',
  template: `
  <router-outlet></router-outlet>`,
  styleUrls: [ '../styles/app.scss'.toString() ]
})

export class App implements OnInit, OnDestroy {
  router: Router;
  route: ActivatedRoute;
  metaService: MetaService;

  showHeader = true;
  showNavbar = true;
  headerLink = ['/'];

  constructor(
    _config: ConfigApp,
    _metaService: MetaService,
    _router: Router,
    _route: ActivatedRoute
  ) {
    this.router = _router;
    this.metaService = _metaService;

    _config.setStateParams();

  }

  ngOnInit() {
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

  }

  logout() {

  }

  processRunningSub(isRunning: boolean) {
    if (isRunning) {
      document.body.style.cursor = 'wait';
    } else {
      document.body.style.cursor = 'default';
    }
  }

}
