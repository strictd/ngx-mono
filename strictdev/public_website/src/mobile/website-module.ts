import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app/app.component';

import { CodeComponent } from './views/code/code';
import { ContactComponent } from './views/contact/contact';
import { HomepageComponent } from './views/homepage/homepage';
import { PeopleComponent } from './views/people/people';

import { WebsiteSharedModule } from '../shared/website-shared-module';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,

    WebsiteSharedModule,
    IonicModule.forRoot(MyApp)
  ],
  declarations: [
    CodeComponent,
    ContactComponent,
    HomepageComponent,
    PeopleComponent
  ],
  entryComponents: [
    CodeComponent,
    ContactComponent,
    HomepageComponent,
    PeopleComponent
  ],
})
export class WebsiteModule {}
