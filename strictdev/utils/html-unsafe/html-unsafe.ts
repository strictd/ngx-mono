import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[htmlUnsafe]'
})
export class HtmlUnsafeDirective {
  constructor(private elem: ElementRef) {}

  @Input() set htmlUnsafe(value: any) {
    setTimeout(() => {
      this.elem.nativeElement.innerHTML = value;
    }, 0);
  }
}
