import { Directive, ElementRef, AfterContentChecked } from '@angular/core';

@Directive({
  selector: '[autoGrow]'
})

export class AutoGrowDirective implements AfterContentChecked {

  constructor(private el: ElementRef) {
    setTimeout(function() {
      const correction = el.nativeElement.offsetHeight - el.nativeElement.clientHeight;
      el.nativeElement.style.height = ((el.nativeElement.scrollHeight - correction) + 10) + 'px';
    }, 0);
  }

  ngAfterContentChecked() {
    this.el.nativeElement.style.height = 'auto';

    const correction = this.el.nativeElement.offsetHeight - this.el.nativeElement.clientHeight;
    this.el.nativeElement.style.height = ((this.el.nativeElement.scrollHeight - correction)) + 'px';
  }

}
