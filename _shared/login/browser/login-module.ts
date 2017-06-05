import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './views/login';
import { LoginModal } from './views/login-modal';
import { LoginProvidersModule } from '../providers';
import { MadameModule } from '../../madame';
import { ModalModule } from '../../../_shared/ng2-modal';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule,
    LoginProvidersModule.forRoot(),
    MadameModule.forRoot()
  ],
  declarations: [
    LoginComponent,
    LoginModal
  ],
  exports: [
    LoginComponent,
    LoginModal
  ]
})
export class LoginModule { }
