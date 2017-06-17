import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

import { IPdfWysiwygNumCircle } from '../../models/i-pdf-wysiwyg-num-circle';

@Component({
  selector: 'pdf-wysiwyg-num-circle',
  templateUrl: './pdf-wysiwyg-num-circle.html',
  styleUrls: [ './pdf-wysiwyg-num-circle.css'.toString() ]
})
export class PdfWysiwygNumCircle implements AfterViewInit {
  @Input('obj') obj: IPdfWysiwygNumCircle;
  @Output() itemClicked = new EventEmitter();

  constructor() {}

  ngAfterViewInit() {

  }

}
