import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { MadameService } from '@strictd/madame/dist/madame-service';

import { Subscription } from 'rxjs/Subscription';

import { ConfigApp } from '../../../../../_shared/config/config.app';

/*
 * App Component
 * Top Level Component
 */

@Component({
  selector: 'strictd-registration',
  template: `<router-outlet></router-outlet>`,
  styleUrls: [ '../styles/app.scss'.toString() ]
})

export class App implements OnInit, OnDestroy {
  service: MadameService;
  router: Router;
  zone: NgZone;

  localRunningHook: Subscription;

  constructor(
    _config: ConfigApp,
    _service: MadameService,
    _router: Router,
    _zone: NgZone
  ) {
    this.service = _service;
    this.zone = _zone;

    const serviceURL = _config.madameService();
    _service.setServer('main', serviceURL);
    // this.socket.setServer('main', _config.madameSocket());

    _config.setStateParams();

    // Set madames cursor wait when running;
    this.localRunningHook = _service.getRunningHook().subscribe(
      (isRunning: boolean) => this.processRunningSub(isRunning)
    );
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.localRunningHook.unsubscribe();
  }

  processRunningSub(isRunning: boolean) {
    if (isRunning) {
      document.body.style.cursor = 'wait';
    } else {
      document.body.style.cursor = 'default';
    }
  }

}
