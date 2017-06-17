import { Component, Input, Output, EventEmitter } from '@angular/core';

import { IPdfWysiwygLine } from '../../models/i-pdf-wysiwyg-line';

@Component({
  selector: 'pdf-wysiwyg-line',
  templateUrl: './pdf-wysiwyg-line.html',
  styleUrls: [ './pdf-wysiwyg-line.css'.toString() ]
})
export class PdfWysiwygLine {
  @Input('obj') obj: IPdfWysiwygLine;
  @Output() itemClicked = new EventEmitter();

  constructor() {}

}
