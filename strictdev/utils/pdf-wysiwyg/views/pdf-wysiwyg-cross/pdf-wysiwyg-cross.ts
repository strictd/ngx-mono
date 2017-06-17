import { Component, Input, Output, EventEmitter } from '@angular/core';

import { IPdfWysiwygCross } from '../../models/i-pdf-wysiwyg-cross';

@Component({
  selector: 'pdf-wysiwyg-cross',
  templateUrl: './pdf-wysiwyg-cross.html',
  styleUrls: [ './pdf-wysiwyg-cross.css'.toString() ]
})
export class PdfWysiwygCross {
  @Input('obj') obj: IPdfWysiwygCross;
  @Input('scale') scale = 1;
  @Output() itemClicked = new EventEmitter();

  htmlStyle = {};
  x: number;
  y: number;
  h: number;
  w: number;
  pL: number;
  pR: number;
  pT: number;
  pB: number;
  stroke: number;

  constructor() {}

  ngOnInit() {
    this.x = this.obj.x * this.scale;
    this.y = this.obj.y * this.scale;
    this.h = this.obj.h * this.scale;
    this.w = this.obj.w * this.scale;
    this.pL = this.obj.pL * this.scale;
    this.pR = this.obj.pR * this.scale;
    this.pT = this.obj.pT * this.scale;
    this.pB = this.obj.pB * this.scale;
    this.stroke = this.obj.stroke * this.scale;

    this.htmlStyle = Object.assign({},
    {
      'top.px': this.y - (this.h / 2) - (this.stroke / 2) - this.pT + 1,
      'left.px': this.x - (this.w / 2) - (this.stroke / 2) - this.pL + 1,
      'width.px': this.w + this.stroke + this.pR + this.pL,
      'height.px': this.h + this.stroke + this.pT + this.pB,
      'padding-top.px': this.pT,
      'padding-right.px': this.pR,
      'padding-bottom.px': this.pB,
      'padding-left.px': this.pL
    });

  }
}
