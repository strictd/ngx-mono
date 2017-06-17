import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistrationComponent } from '../views/registration/registration';
import { RegisteredComponent } from '../views/registered/registered';
import { RegistrationFormComponent } from '../views/registration-form/registration-form';

export const appRoutes: Routes = [
  { path: '', component: RegistrationComponent },
  { path: 'registration-form', component: RegistrationFormComponent },
  { path: ':id', component: RegisteredComponent }
];

export let appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
