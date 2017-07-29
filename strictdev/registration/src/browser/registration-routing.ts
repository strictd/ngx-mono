import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegistrationModule } from './registration-module';

import { appRoutes } from './app/app-routing';

@NgModule({
  imports: [
    RegistrationModule.forRoot(),
    RouterModule.forChild(appRoutes)
  ]
})
export class RegistrationRouting {}
