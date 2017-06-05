import { Component } from '@angular/core';

@Component({
  selector: 'navbar-component',
  template: `<ng-content></ng-content>`,
  styleUrls: [ './navbar.css'.toString() ]
})
export class NavbarComponent {
  constructor() { }
}
