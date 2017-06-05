import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigApp } from './config.app';
import { ProfileApp } from './profile.app';
import { PermissionsApp } from './permissions.app';

@NgModule({
  imports: [ CommonModule ],
  exports: [ CommonModule ]
})
export class ConfigProvidersModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ConfigProvidersModule,
      providers: [
        ConfigApp,
        ProfileApp,
        PermissionsApp
      ]
    };
  }
}
