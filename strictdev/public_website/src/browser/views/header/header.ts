import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'homepage-header',
  templateUrl: './header.html',
  styleUrls: [ './header.scss' ]
})

export class HomepageHeader implements OnInit, OnDestroy {
  isCollapsed = true;

  constructor() {}

  ngOnInit() {

  }

  ngOnDestroy() {

  }

  runCollapsed(_$event) {
    this.isCollapsed = !this.isCollapsed
  }
}
