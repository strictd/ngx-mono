import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ModalModule } from '../../../../_shared/ng2-modal';

import { CodeComponent } from './views/code/code';
import { ContactComponent } from './views/contact/contact';
import { HomepageComponent } from './views/homepage/homepage';
import { HomepageLayout } from './views/homepage-layout/homepage-layout';
import { HomepageHeader } from './views/header/header';
import { HomepageFooter } from './views/footer/footer';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found';
import { PeopleComponent } from './views/people/people';
import { WebsiteSharedModule } from '../shared/website-shared-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    ModalModule,
    WebsiteSharedModule
  ],
  declarations: [
    CodeComponent,
    ContactComponent,
    HomepageComponent,
    HomepageLayout,
    HomepageHeader,
    HomepageFooter,
    PageNotFoundComponent,
    PeopleComponent
  ],
  exports: [
    CodeComponent,
    ContactComponent,
    HomepageComponent,
    HomepageLayout,
    HomepageHeader,
    HomepageFooter,
    PageNotFoundComponent,
    PeopleComponent
  ]
})
export class WebsiteModule {}
