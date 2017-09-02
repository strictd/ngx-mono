import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

import { MadameModule } from '@strictd/madame/dist/';

import { ConfigProvidersModule } from '../../../../../_shared/config/config-providers-module';

import { ClassTransformer } from 'class-transformer';

import { ModalModule } from '../../../../../_shared/ng2-modal';
import { appRouting } from './app-routing';

import { App } from '../app/app.component';
import { RegistrationModule } from '../registration-module';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule,
    ModalModule,
    appRouting,
    ConfigProvidersModule.forRoot(),
    MadameModule.forRoot(),
    RegistrationModule.forRoot()
  ],
  declarations: [
    App
  ],
  providers: [
    ClassTransformer
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
