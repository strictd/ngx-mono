import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigApp } from '../config/config.app';
import { Http, RequestOptions } from '@angular/http';
import { JwtHelper, AuthHttp, AuthConfig } from 'angular2-jwt';
import { MadameService } from './madame-service';
import { MadameSocket } from './madame-socket';
import { MadameAuth } from './madame-auth';

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
export class MadameModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MadameModule,
      providers: [
        {
          provide: AuthHttp,
          useFactory: authHttpServiceFactory,
          deps: [Http, RequestOptions]
        },
        JwtHelper,
        MadameService,
        MadameSocket,
        MadameAuth
      ]
    };
  }
}

