import { Component } from '@angular/core';

import { HomepageComponent } from '../homepage/homepage';
import { CodeComponent } from '../code/code';
import { ContactComponent } from '../contact/contact';
import { PeopleComponent } from '../people/people';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomepageComponent;
  tab2Root: any = CodeComponent;
  tab3Root: any = ContactComponent;
  tab4Root: any = PeopleComponent;

  constructor() {

  }
}
