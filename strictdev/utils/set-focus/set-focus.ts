import { Directive, AfterViewInit, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[setFocus]'
})
export class SetFocusDirective implements AfterViewInit {

  constructor(public renderer: Renderer, public elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.renderer.invokeElementMethod(
      this.elementRef.nativeElement, 'focus', []);
  }

}
