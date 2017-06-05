import { Directive, Input, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[draggable]'
})
export class DraggableDirective implements OnInit {
  topStart = 0;
  leftStart = 0;
  _allowDrag = true;
  _dragPosition = 'relative';
  md: boolean;

  constructor(public element: ElementRef) {}

  ngOnInit() {
    // css changes
    if (this._allowDrag) {
      this.element.nativeElement.style.position = this._dragPosition;
      this.element.nativeElement.className += ' cursor-draggable';
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: any) {
    const checkHandlebar = new RegExp('(^|\\s)draggable_handlebar(\\s|$)').test(event.target.className);
    if (event.button === 2 || !checkHandlebar) {
      return; // prevents right click drag, remove his if you don't want it
    }

    this.md = true;
    this.topStart = event.clientY - this.element.nativeElement.style.top.replace('px', '');
    this.leftStart = event.clientX - this.element.nativeElement.style.left.replace('px', '');
  }

  @HostListener('document:mouseup')
  onMouseUp(_event: any) {
    this.md = false;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: any) {
    if (this.md && this._allowDrag) {
      this.element.nativeElement.style.top = (event.clientY - this.topStart) + 'px';
      this.element.nativeElement.style.left = (event.clientX - this.leftStart) + 'px';
    }
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: any) {
    this.md = true;
    this.topStart = event.changedTouches[0].clientY - this.element.nativeElement.style.top.replace('px', '');
    this.leftStart = event.changedTouches[0].clientX - this.element.nativeElement.style.left.replace('px', '');
    event.stopPropagation();
  }

  @HostListener('document:touchend')
  onTouchEnd() {
    this.md = false;
  }

  @HostListener('document:touchmove', ['$event'])
  onTouchMove(event: any) {
    if (this.md && this._allowDrag) {
      this.element.nativeElement.style.top = ( event.changedTouches[0].clientY - this.topStart ) + 'px';
      this.element.nativeElement.style.left = ( event.changedTouches[0].clientX - this.leftStart ) + 'px';
    }
    event.stopPropagation();
  }

  @Input('draggable')
  set allowDrag(value: boolean) {
    this._allowDrag = value;
    if (this._allowDrag) {
      this.element.nativeElement.className += ' cursor-draggable';
    } else {
      this.element.nativeElement.className = this.element.nativeElement.className
                                              .replace(' cursor-draggable', '');
    }
  }

  @Input('draggable-position')
  set dragPosition(value: string) {
    this._dragPosition = value || 'relative';
  }
}
