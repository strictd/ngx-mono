import { NgModule, ApplicationRef } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

import { ConfigProvidersModule } from '../../../../../_shared/config/config-providers-module';

import { ClassTransformer } from 'class-transformer';

import { appRouting } from './app-routing';

import { App } from '../app/app.component';
import { MetaModule } from '@ngx-meta/core';
import { WebsiteModule } from '../website-module';



@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule,
    appRouting,

    ConfigProvidersModule.forRoot(),
    MetaModule.forRoot(),
    WebsiteModule
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
  // hmrOnInit(store) {
    // console.log('HMR store', store);
  hmOnInit() {

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
