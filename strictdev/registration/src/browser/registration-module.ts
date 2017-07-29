import { NgModule, ModuleWithProviders } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { EventInfoComponent } from './views/event-info/event-info';
import { FormComponent } from './views/form-component/form-component';
import { PdfWysiwygModule } from '../../../utils/pdf-wysiwyg/pdf-wysiwyg-module';
import { RecaptchaComponent } from '../../../utils/recaptcha/recaptcha';
import { RegisteredComponent } from './views/registered/registered';
import { RegistrationComponent } from './views/registration/registration';
import { RegistrationFormComponent } from './views/registration-form/registration-form';
import { RegistrationService } from '../providers/registration-service';
import { TemplateComponent } from './views/template/template';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PdfWysiwygModule.forRoot(),
    RouterModule
  ],
  declarations: [
    EventInfoComponent,
    FormComponent,
    TemplateComponent,
    RegisteredComponent,
    RegistrationComponent,
    RegistrationFormComponent,
    RecaptchaComponent
  ],
  exports: [
    EventInfoComponent,
    FormComponent,
    TemplateComponent,
    RegisteredComponent,
    RegistrationComponent,
    RegistrationFormComponent
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
