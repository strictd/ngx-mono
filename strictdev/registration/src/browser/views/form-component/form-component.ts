import { Component, ViewChild, Output, EventEmitter, ChangeDetectorRef, OnInit, OnDestroy, NgZone } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { RegistrationService } from '../../../../src/providers/registration-service';

declare const grecaptcha: any;
declare const window: any;

@Component({
  selector: 'form-component',
  templateUrl: './form-component.html',
  styleUrls: [ './form-component.css'.toString() ]
})

export class FormComponent implements OnInit, OnDestroy {
  @ViewChild('reCaptcha') reCaptcha;
  @Output() isRegistering = new EventEmitter<boolean>();

  form = {
    shortid: '',
    first: '',
    last: '',
    email: '',
    phone_area: '',
    phone: '',
    recaptcha: ''
  };
  service: RegistrationService;
  change: ChangeDetectorRef;
  router: Router;
  route: ActivatedRoute;

  gotCaptcha = false;
  sending = false;

  constructor(_service: RegistrationService, _change: ChangeDetectorRef,
              _router: Router, _platform: PlatformLocation, _ngZone: NgZone,
              _route: ActivatedRoute) {
    this.service = _service;
    this.change = _change;
    this.router = _router;
    this.route = _route;

    window['registrationRef'] = { component: this, zone: _ngZone };
    window['recaptchaResolved'] = this.recaptchaResolved.bind(this);
    window['recaptchaExpired'] = this.recaptchaExpired.bind(this);

    _platform.onPopState(() => { location.reload(); });

  }

  ngOnInit() {
    this.registerRecaptchaOnload();
    this.addRecaptchaScript();
  }

  ngOnDestroy() {
    window['registrationRef'] = null;
    window['recaptchaResolved'] = null;
    window['recaptchaExpired'] = null;
  }

  registerRecaptchaOnload() {
    window.recaptchaOnload = () => {
      const params = {
        'sitekey': '6LfS7xMUAAAAAGw1-DWeiqeVPAp6S0MAgrwLZo5r', // ReCaptcha Client Side SiteKey
        'callback': this.recaptchaResolved,
        'expired-callback': this.recaptchaExpired
      };
      grecaptcha.render('g-recaptcha', params);
    }
  }
  recaptchaResolved(evt) {
    const t = window['registrationRef'].component;
    t.form.recaptcha = evt;
    t.gotCaptcha = true;
    t.change.detectChanges();
  }

  recaptchaExpired() {
    const t = window['registrationRef'].component;
    t.form.recaptcha = '';
    t.gotCaptcha = false;
    t.change.detectChanges();
  }

  addRecaptchaScript() {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js?onload=recaptchaOnload&render=explicit';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }

  submitApplication() {
    if (!this.gotCaptcha) { return; }
    this.gotCaptcha = false;
    this.sending = true;

    this.service.addRegistration(this.form).subscribe(result => {
      const data = result[0] || null;
      if (!data) { throw {'message': 'no response from server'}; }

      this.router.navigate([data.shortid], { relativeTo: this.route });
    }, err => {
      this.gotCaptcha = false;
      this.sending = false;
      grecaptcha.reset();
      if (!err.status) {
        alert('Sorry, The server is currently not accepting applications.\n\nPlease double check this event is still active and try again later.');
      } else if (err.message) {
        alert(`Sorry, There was a server error submitting your application.\n\n${err.message}`);
      } else {
        alert('Sorry, The server responded with an unknown error.\n\nPlease double check this event is still active and try again later.');
      }
    });

    this.isRegistering.emit(true);

  }

}
