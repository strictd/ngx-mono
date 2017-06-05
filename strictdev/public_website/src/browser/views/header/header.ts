import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'homepage-header',
  templateUrl: './header.html',
  styleUrls: [ './header.css'.toString() ]
})

export class HomepageHeader implements OnInit, OnDestroy {
  isCollapsed = true;

  constructor() {}

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}
