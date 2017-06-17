import { Component, OnInit, Output, ViewChild, EventEmitter, Input } from '@angular/core';

import { IPdfWysiwygItem } from '../../models/i-pdf-wysiwyg-item';

import { PdfWysiwygService } from '../../providers/pdf-wysiwyg-service';
import { ToolUtils } from '../../providers/tool-utils';

@Component({
  selector: 'pdf-wysiwyg-toolbox',
  templateUrl: './pdf-wysiwyg-toolbox.html',
  styleUrls: [ './pdf-wysiwyg-toolbox.css'.toString() ]
})
export class PdfWysiwygToolbox implements OnInit {
  @ViewChild('toolPanel') toolPanel;
  @ViewChild('transferPanel') transferPanel;
  @Output() runDraw = new EventEmitter();
  @Output() runClearCanvas = new EventEmitter();
  @Output() runMakePDF = new EventEmitter();
  @Output() stopArrows = new EventEmitter();
  @Input('pdfService') pdfService: any;

  service: PdfWysiwygService;
  draggablePosition = 'fixed';
  settingItem: IPdfWysiwygItem = null;

  showTools = true;
  showDisplays = true;
  showSize = true;
  showPlacement = true;
  showPadding = true;
  showDetails = true;

  showRequired = true;
  showSampleText = false;
  showFont = false;
  showAlignment = false;
  showStroke = false;
  showSelected = false;
  showSpacing = false;
  showMaxlength = false;
  showTextTransform = false;
  showBorder = false;
  showBoxShadow = false;
  showTransform = false;

  constructor(private globalPdfService: PdfWysiwygService) {}

  ngOnInit() {
    this.service = this.pdfService || this.globalPdfService;

    if (this.service.toolType) {
      this.settingItem = new IPdfWysiwygItem({
        t: this.service.toolType,
        obj: this.service.toolboxDefaults[this.service.toolType]
      });
    }

    this.service.itemChanged.subscribe(item => {
      if (item) {
        this.settingItem = item;
      } else {
        this.settingItem = new IPdfWysiwygItem({
          t: this.service.toolType,
          obj: this.service.toolboxDefaults[this.service.toolType]
        });
      }

      this.toolChanged(this.settingItem.t);
    });
  }

  toolChanged(tool) {
    this.clearAddons();
    if (tool === 'textbox') {
      this.showRequired = true;
      this.showSampleText = true;
      this.showFont = true;
      this.showAlignment = true;
      this.showSpacing = true;
      this.showMaxlength = true;
      this.showTextTransform = true;
      this.showBorder = true;
      this.showBoxShadow = true;
      this.showTransform = true;
    } else if (tool === 'cross') {
      this.showStroke = true;
      this.showSelected = true;

    } else if (tool === 'line') {
      this.showStroke = true;
    } else if (tool === 'ellipse') {
      this.showStroke = true;
    }
  }

  clearAddons() {
    this.showRequired = false;
    this.showSampleText = false;
    this.showFont = false;
    this.showAlignment = false;
    this.showStroke = false;
    this.showSelected = false;
    this.showSpacing = false;
    this.showMaxlength = false;
    this.showTextTransform = false;
    this.showBorder = false;
    this.showBoxShadow = false;
    this.showTransform = false;
  }

  draw() {
    this.runDraw.emit();
  }

  copyItem(item: IPdfWysiwygItem) {
    if (this.service.displayMode !== 'edit') { return; }

    this.service.copyItem(item);
    this.draw();
  }
  removeItem(item: IPdfWysiwygItem) {
    if (this.service.displayMode !== 'edit') { return; }

    this.service.removeItem(item);
    this.draw();
  }

  setTool(t) {
    if (this.service.toolType === t) {
      this.service.changeItem(null);
    } else {
      this.service.toolType = t;
      this.toolChanged(t);
    }
    this.draw();
  }
  setDisplay(t) {
    this.service.showInfo = t;
    this.draw();
  }
  setEditMode() {
    this.service.displayMode = 'edit';
    this.draw();
  }
  setInputMode() {
    this.runClearCanvas.emit();
    this.service.displayMode = 'input';
  }

  confirmClear() {
    if (this.service.displayMode !== 'edit') { return; }

    this.service.clearItems();
    this.runClearCanvas.emit();
  }
  makePDF() {
    this.runMakePDF.emit();
  }
  printPDF() {
    ToolUtils.getNativeWindow().print();
  }

  setDraggablePosition() {
    const el = this.toolPanel.nativeElement;
    if (this.draggablePosition === 'fixed') {
      this.draggablePosition = 'absolute';
      el.style.top = `${el.offsetTop + document.body.scrollTop}px`;
    } else {
      this.draggablePosition = 'fixed';
      el.style.top = `${el.offsetTop - document.body.scrollTop}px`;
    }
  }
}
