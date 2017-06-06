import { Component } from '@angular/core';

@Component({
  selector: 'navbar-component',
  template: `<ng-content></ng-content>`,
  styleUrls: [ './navbar.css' ]
})
export class NavbarComponent {
  constructor() { }
}
