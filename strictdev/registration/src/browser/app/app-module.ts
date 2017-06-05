import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

import { MadameService } from '../../../../../_shared/madame/madame-service';

import { ConfigApp } from '../../../../../_shared/config/config.app';

import { ClassTransformer } from 'class-transformer';

import { ModalModule } from '../../../../../_shared/ng2-modal';
import { appRouting } from './app-routing';

import { App } from '../app/app.component';

import { EventInfoComponent } from '../views/event-info/event-info';
import { FormComponent } from '../views/form-component/form-component';
import { TemplateComponent } from '../views/template/template';
import { RegisteredComponent } from '../views/registered/registered';
import { RegistrationComponent } from '../views/registration/registration';
import { RegistrationService } from '../../providers/registration-service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule,
    ModalModule,
    appRouting
  ],
  declarations: [
    App,
    EventInfoComponent,
    FormComponent,
    TemplateComponent,
    RegisteredComponent,
    RegistrationComponent
  ],
  providers: [
    ConfigApp,
    MadameService,
    ClassTransformer,
    RegistrationService
  ],
  bootstrap: [ App ],
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    if (store) { }
    // console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
