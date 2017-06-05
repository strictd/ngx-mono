import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../views/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WebsiteModule } from '../website-module';

// import { ConfigProvidersModule } from '../../../../../_shared/config/config-providers-module';
// import { LoginModule } from '../../../../../_shared/login/mobile/login-module';
// import { MadameModule } from '../../../../../_shared/madame';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    // LoginModule,
    // ConfigProvidersModule.forRoot(),
    // MadameModule.forRoot(),
    WebsiteModule,
    IonicModule.forRoot(MyApp)
  ],
  declarations: [
    MyApp,
    TabsPage
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
