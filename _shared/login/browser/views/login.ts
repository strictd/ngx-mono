import { Component, OnInit, Input, Output, ViewChild, EventEmitter, Renderer, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { plainToClass } from 'class-transformer';

import { LoginService } from '../../providers/login-service';
import { ILogin } from '../../models/i-login';

@Component({
  selector: 'login-component',
  templateUrl: './login.html',
  styleUrls: [ './login.css'.toString() ]
})

export class LoginComponent implements OnInit {
  @Input() isModal = false;
  @Output() onSubmit = new EventEmitter(false); // modal login windows subscribes to close window
  @ViewChild('password') elePassword: ElementRef; // allows focus setting for enter key from login to password

  login: LoginService;
  router: Router;
  renderer: Renderer;
  route: ActivatedRoute;

  loginData: ILogin = plainToClass(ILogin, {} as Object);
  runningLogin = false;

  forwardURL: string;

  loginMinWidth = 760;
  loginMinHeight = 550;
  loginCurrentWidth = 0;
  loginCurrentHeight = 0;

  constructor(_login: LoginService, _renderer: Renderer, _router: Router,
              _route: ActivatedRoute) {
    this.login = _login;
    this.renderer = _renderer;
    this.router = _router;
    this.route = _route;
  }

  ngOnInit() {
    this.route.data.
    subscribe((data: { forwardURL: string }) =>
      this.forwardURL = data.forwardURL
    );
  }

  onKeyPress(evt: any) {
    if (evt.keyCode === 13) {
      evt.preventDefault();
      this.renderer.invokeElementMethod(this.elePassword.nativeElement, 'focus', []);
    }
  }
  submitLogin(forwardRoute?: string) {
    this.runningLogin = true;
    const loginInfo: ILogin = new ILogin();
    loginInfo.username = this.loginData.username;
    loginInfo.password = this.loginData.password;

    const fRoute = forwardRoute || this.forwardURL || '/';

    this.login.doLogin(loginInfo).then(_resp => {
      this.cleanForm();

      if (this.isModal) {
        this.onSubmit.emit(true);
      } else {
        this.router.navigateByUrl(fRoute);
      }
    }).catch(err => {
      this.cleanPassword();
      this.runningLogin = false;
      alert(err.message || err);
    });

  }

  cleanForm() {
    this.loginData.username = '';
    this.cleanPassword();
    this.runningLogin = false;
  }
  cleanPassword() {
    this.loginData.password = '';
  }

  modalLoginClose() {
    // this.mono.log('Closing');
  }
  returnToOriginalSize() {
    window.resizeTo(this.loginCurrentWidth, this.loginCurrentHeight);
  }
  resizeForModalLogin() {
    this.loginCurrentWidth = window.outerWidth;
    this.loginCurrentHeight = window.outerHeight;
    if (window.innerWidth < this.loginMinWidth || window.innerHeight < this.loginMinHeight) {
      let addW = this.loginMinWidth - window.innerWidth;
      let addH = this.loginMinHeight - window.innerHeight;
      if (addW < 0) { addW = 0; }
      if (addH < 0) { addH = 0; }
      window.resizeBy(addW, addH);
    }
  }
}
