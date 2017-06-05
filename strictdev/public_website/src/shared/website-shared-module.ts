import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CodeSharedComponent } from './code/code';
import { ContactSharedComponent } from './contact/contact';
import { HomepageHeaderComponent } from './homepage-header/homepage-header';
import { HomepageSharedComponent } from './homepage/homepage';
import { PeopleSharedComponent } from './people/people';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    CodeSharedComponent,
    ContactSharedComponent,
    HomepageHeaderComponent,
    HomepageSharedComponent,
    PeopleSharedComponent
  ],
  exports: [
    CodeSharedComponent,
    ContactSharedComponent,
    HomepageHeaderComponent,
    HomepageSharedComponent,
    PeopleSharedComponent
  ]
})
export class WebsiteSharedModule {}
