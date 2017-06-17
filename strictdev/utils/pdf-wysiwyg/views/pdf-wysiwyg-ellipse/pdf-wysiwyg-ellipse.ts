import { OnInit, Component, Input, Output, EventEmitter } from '@angular/core';

import { IPdfWysiwygEllipse } from '../../models/i-pdf-wysiwyg-ellipse';

@Component({
  selector: 'pdf-wysiwyg-ellipse',
  templateUrl: './pdf-wysiwyg-ellipse.html',
  styleUrls: [ './pdf-wysiwyg-ellipse.css'.toString() ]
})
export class PdfWysiwygEllipse implements OnInit {
  @Input('obj') obj: IPdfWysiwygEllipse;
  @Input('styling') styling;
  @Output() itemChanged = new EventEmitter();
  @Output() itemFocused = new EventEmitter();
  @Output() itemLost = new EventEmitter();

  htmlStyle = {};

  constructor() {}

  ngOnInit() {
    this.htmlStyle = Object.assign({}, this.styling,
    {
      'top.px': this.obj.y + 1,
      'left.px': this.obj.x + 1,
      'width.px': this.obj.w,
      'height.px': this.obj.h
    });
  }

}
