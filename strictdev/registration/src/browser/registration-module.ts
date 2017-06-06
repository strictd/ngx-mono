import { NgModule, ModuleWithProviders } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { EventInfoComponent } from './views/event-info/event-info';
import { FormComponent } from './views/form-component/form-component';
import { TemplateComponent } from './views/template/template';
import { RegisteredComponent } from './views/registered/registered';
import { RegistrationComponent } from './views/registration/registration';
import { RegistrationService } from '../providers/registration-service';

import { RecaptchaComponent } from '../../../utils/recaptcha/recaptcha';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    EventInfoComponent,
    FormComponent,
    TemplateComponent,
    RegisteredComponent,
    RegistrationComponent,

    RecaptchaComponent
  ],
  exports: [
    EventInfoComponent,
    FormComponent,
    TemplateComponent,
    RegisteredComponent,
    RegistrationComponent
  ]
})
export class RegistrationModule {
    static forRoot(): ModuleWithProviders {
    return {
      ngModule: RegistrationModule,
      providers: [
        RegistrationService
      ]
    };
  }
}
