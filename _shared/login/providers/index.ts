import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http, RequestOptions } from '@angular/http';

import { JwtHelper } from 'angular2-jwt';

import { ConfigApp } from '../../config/config.app';

import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { AuthGuard } from './auth-guard';
import { LoginService, LoginCmd } from './login-service';
import { MadameService } from '../../madame/madame-service';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    headerName: 'Authorization',
    headerPrefix: 'bearer',
    tokenName: 'jwt',
    tokenGetter: (() => localStorage.getItem('jwt') || ConfigApp.getCookie('jwt')),
    // globalHeaders: [{ 'Content-Type': 'application/json' }],
    noJwtError: true
  }), http, options);
}

@NgModule({
  imports: [ CommonModule ],
  exports: [ CommonModule ]
})
export class LoginProvidersModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LoginProvidersModule,
      providers: [
        LoginService,
        LoginCmd,
        AuthGuard,
        {
          provide: AuthHttp,
          useFactory: authHttpServiceFactory,
          deps: [Http, RequestOptions]
        },
        JwtHelper
      ]
    };
  }

  constructor(_config: ConfigApp, _service: MadameService) {
    _service.setServer('main', _config.madameService());
  }
}
