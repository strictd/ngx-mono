import { Component, ViewChild, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { PdfWysiwygService } from '../../providers/pdf-wysiwyg-service';

@Component({
  selector: 'pdf-wysiwyg-layers',
  templateUrl: './pdf-wysiwyg-layers.html',
  styleUrls: [ './pdf-wysiwyg-layers.css'.toString() ]
})
export class PdfWysiwygLayers implements OnInit {

  @ViewChild('layersPanel') layersPanel;
  @Input('pdfService') pdfService: any;
  @Output() runDraw = new EventEmitter();
  @Output() runSave = new EventEmitter();

  // test data for layers
  // data: any[] = [{'t': 'textbox', 'id': 'uJrMw'}, {'t': 'textbox', 'id': 'iDLid'}, {'t': 'textbox', 'id': 'PlskI'}];

  draggablePosition = 'fixed';
  showLayers = true;
  service: PdfWysiwygService;

  constructor(private globalPdfService: PdfWysiwygService) {}

  ngOnInit() {
    this.service = this.pdfService || this.globalPdfService;
  }

  setDraggablePosition() {
    const el = this.layersPanel.nativeElement;
    if (this.draggablePosition === 'fixed') {
      this.draggablePosition = 'absolute';
      el.style.top = `${el.offsetTop + document.body.scrollTop}px`;
    } else {
      this.draggablePosition = 'fixed';
      el.style.top = `${el.offsetTop - document.body.scrollTop}px`;
    }
  }

  layerDown(pos: number, evt: any) {
    evt.stopPropagation();
    if (pos > this.service.allItems.length) { return; }
    this.service.allItems.splice(pos + 1, 0, this.service.allItems.splice(pos, 1)[0]);
    this.runSave.emit();
  }

  layerUp(pos: number, evt: any) {
    evt.stopPropagation();
    if (pos < 1) { return; }
    this.service.allItems.splice(pos - 1, 0, this.service.allItems.splice(pos, 1)[0]);
    this.runSave.emit();
  }

  selectItem(layer: any) {
    this.service.changeItem(layer);
    this.runDraw.emit();
  }
}
