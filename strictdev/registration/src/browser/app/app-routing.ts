import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistrationComponent } from '../views/registration/registration';
import { RegisteredComponent } from '../views/registered/registered';
const routes: Routes = [
  { path: '', component: RegistrationComponent },
  { path: ':id', component: RegisteredComponent }
];

export let appRouting: ModuleWithProviders = RouterModule.forRoot(routes);
