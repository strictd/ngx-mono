import { Component, Input, Output, ElementRef, EventEmitter, OnInit, OnDestroy, NgZone } from '@angular/core';
import { RecaptchaConfig } from './recaptcha-config';

declare const grecaptcha: any;
declare const window: any;

@Component({
  selector: 'recaptcha-component',
  template: '<div id="g-recaptcha" [class.required]="isRequired" [style.width]="rewidth" [style.height]="reheight"></div>',
  styles: [`div.required {
    border: 1px solid red;
  }`]
})

export class RecaptchaComponent implements OnInit, OnDestroy {
  @Input() sitekey: string;
  @Input() config: RecaptchaConfig;
  @Input() rewidth: string;
  @Input() reheight: string;
  @Input() isRequired = false;
  @Output() resolved = new EventEmitter<boolean>();
  @Output() expired = new EventEmitter<boolean>();

  constructor(_element: ElementRef, _ngZone: NgZone) {
    window['registrationRef'] = { component: this, zone: _ngZone };
    window['recaptchaResolved'] = this.recaptchaResolved.bind(this);
    window['recaptchaExpired'] = this.recaptchaExpired.bind(this);
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
        ...this.config,
        'sitekey': this.sitekey,
        'callback': this.recaptchaResolved,
        'expired-callback': this.recaptchaExpired
      };
      grecaptcha.render('g-recaptcha', params);
    }
  }
  recaptchaResolved(evt) {
    const t = window['registrationRef'].component;
    t.resolved.emit(evt);
  }

  recaptchaExpired() {
    const t = window['registrationRef'].component;
    t.expired.emit(true);
  }

  recaptchaReset() {
    grecaptcha.reset();
  }

  addRecaptchaScript() {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js?onload=recaptchaOnload&render=explicit';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }
}
