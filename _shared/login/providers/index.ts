import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigApp } from '../../config/config.app';

import { AuthGuard } from './auth-guard';
import { LoginService, LoginCmd } from './login-service';
import { MadameService } from '@strictd/madame/dist/madame-service';

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
        AuthGuard
      ]
    };
  }

  constructor(_config: ConfigApp, _service: MadameService) {
    _service.setServer('main', _config.madameService());
  }
}
