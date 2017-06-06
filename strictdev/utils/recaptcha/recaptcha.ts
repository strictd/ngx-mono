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

  ngZone: NgZone;

  constructor(_element: ElementRef, _ngZone: NgZone) {
    this.ngZone = _ngZone;
  }

  ngOnInit() {
    this.registerRecaptchaOnload();
    this.addRecaptchaScript();
  }

  ngOnDestroy() {

  }

  registerRecaptchaOnload() {
    window.recaptchaOnload = () => {
      const params = {
        ...this.config,
        'sitekey': this.sitekey,
        'callback': this.recaptchaResolved.bind(this),
        'expired-callback': this.recaptchaExpired.bind(this)
      };
      grecaptcha.render('g-recaptcha', params);
    }
  }
  recaptchaResolved(evt) {
    this.ngZone.run(() => {
      this.resolved.emit(evt);
    });
  }

  recaptchaExpired() {
    this.ngZone.run(() => {
      this.expired.emit(true);
    });
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
