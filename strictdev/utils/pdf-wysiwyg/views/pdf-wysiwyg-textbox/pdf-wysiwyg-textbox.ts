import { OnInit, Component, Input, Output, EventEmitter } from '@angular/core';

import { PdfWysiwygService } from '../../providers/pdf-wysiwyg-service';
import { IPdfWysiwygTextbox } from '../../models/i-pdf-wysiwyg-textbox';

@Component({
  selector: 'pdf-wysiwyg-toolbar-textbox',
  template: `<div class="toolbar" [class.active]="service.toolType === 'textbox'"
          (click)="setTool('textbox')">
        <i class="glyphicon glyphicon-text-width"></i>
      </div>`
})
export class PdfWysiwygToolbarTextbox implements OnInit {
  @Input('pdfService') pdfService: any;
  service: PdfWysiwygService;

  constructor(private globalPdfService: PdfWysiwygService) {}

  ngOnInit() {
    this.service = this.pdfService || this.globalPdfService;
  }

  activateTool() {
    this.service.setTool('textbox');
  }
}

@Component({
  selector: 'pdf-wysiwyg-textbox',
  templateUrl: './pdf-wysiwyg-textbox.html',
  styleUrls: [ './pdf-wysiwyg-textbox.css'.toString() ]
})
export class PdfWysiwygTextbox implements OnInit {
  @Input('id') id: string;
  @Input('obj') obj: IPdfWysiwygTextbox;
  @Input('scale') scale = 1;
  @Input('styling') styling;
  @Output() itemChanged = new EventEmitter();
  @Output() itemFocused = new EventEmitter();
  @Output() itemLost = new EventEmitter();

  htmlStyle = {};

  constructor() {}

  ngOnInit() {
    this.htmlStyle = Object.assign({}, this.styling,
    {
      'top.px': (this.obj.y * this.scale) - (this.obj.pT * this.scale) - 1,
      'left.px': (this.obj.x * this.scale) - (this.obj.pL * this.scale) + 1,
      'width.px': this.obj.w * this.scale,
      'height.px': this.obj.h * this.scale,
      'padding-top.px': this.obj.pT * this.scale,
      'padding-left.px': this.obj.pL * this.scale,
      'padding-right.px': this.obj.pR * this.scale,
      'padding-bottom.px': this.obj.pB * this.scale,
      'margin-top.px': this.obj.pT * this.scale,
      'margin-right.px': this.obj.pR * this.scale,
      'margin-bottom.px': this.obj.pB * this.scale,
      'margin-left.px': this.obj.pL * this.scale,
      'font-size': (this.obj.fontSize * this.scale) + 'px',
      'font-family': this.obj.fontStyle,
      'text-align': this.obj.alignment,
      'letter-spacing': (this.obj.spacing * this.scale) + 'px',
      'word-spacing': (this.obj.spacing * this.scale) + 'px',
      'text-transform': this.obj.textTransform,
      'overflow': this.obj.overflow,
      'border': this.obj.border,
      'box-shadow': this.obj.boxShadow,
      'transform': this.obj.transform
    });
  }

}
