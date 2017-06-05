import { Component, Input } from '@angular/core';

@Component({
  selector: 'header-component',
  templateUrl: './header.html'
})
export class HeaderComponent {
  @Input() routerLinkArray = ['/'];

  constructor() {}

}
