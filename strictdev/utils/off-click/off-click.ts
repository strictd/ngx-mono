import { Directive, OnInit, OnDestroy, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[offClick]'
})
export class OffClickDirective implements OnInit, OnDestroy {
  @Input('offClick') offClick: any;

  @HostListener('mouseenter') onMouseEnter($event: any) {
    $event.stopPropagation();
  }

  constructor() {}

  ngOnInit() {
    const self = this;
    setTimeout(() => { document.addEventListener('click', self.offClick); }, 0);
  }

  ngOnDestroy() {
    const self = this;
    document.removeEventListener('click', self.offClick);
  }

}
