import { Component, Output, ViewChild, EventEmitter } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { RegistrationService } from '../../../../src/providers/registration-service';

@Component({
  selector: 'form-component',
  templateUrl: './form-component.html',
  styleUrls: [ './form-component.css' ]
})

export class FormComponent {
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
  // change: ChangeDetectorRef;
  router: Router;
  route: ActivatedRoute;

  gotCaptcha = false;
  sending = false;

  constructor(_service: RegistrationService, // _change: ChangeDetectorRef,
              _router: Router, _platform: PlatformLocation,
              _route: ActivatedRoute) {
    this.service = _service;
    // this.change = _change;
    this.router = _router;
    this.route = _route;

    _platform.onPopState(() => { location.reload(); });

  }

  recaptchaResolved(got) {
    this.gotCaptcha = got;
    this.form.recaptcha = got;
    // this.change.detectChanges();
  }

  recaptchaExpired() {
    this.gotCaptcha = false;
    this.form.recaptcha = '';
    // this.change.detectChanges();
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

      this.reCaptcha.recaptchaReset();

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
