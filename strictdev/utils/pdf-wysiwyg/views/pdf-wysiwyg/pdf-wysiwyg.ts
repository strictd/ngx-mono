import { Component, ViewChild, Input, Output, OnInit, AfterViewInit,
         HostListener, EventEmitter } from '@angular/core';

// import { plainToClass } from 'class-transformer';
import { IPdfWysiwygItem } from '../../models/i-pdf-wysiwyg-item';

import { PdfWysiwygService } from '../../providers/pdf-wysiwyg-service';
import { ToolUtils } from '../../providers/tool-utils';

// import * as fs from 'fs';
// import * as path from 'path';
// declare let bepp: any;

declare const blobStream: any;
declare const PDFDocument: any;
declare const SVGtoPDF: any;

@Component({
  selector: 'pdf-wysiwyg',
  templateUrl: './pdf-wysiwyg.html',
  styleUrls: [ './pdf-wysiwyg.css'.toString() ]
})
export class PdfWysiwyg implements OnInit, AfterViewInit {
  @Input('svg') svg: string;
  @Input('width') width = 0;
  @Input('height') height = 0;
  @Input('layout') layout = 'portrait';
  @Input('viewScale') viewScale = 1;
  @Input('pdfScale') pdfScale = 1;
  @Input('ident') ident: string;
  @Input('pdfService') pdfService: any;

  @Input()
  get data() { return this.service.allItems; };
  set data(dataSet) { this.service.loadDataset(dataSet); }

  @Input()
  get item() { return this.service.activeItem; }
  set item(i) { this.service.changeItem(i); }

  @Output() save = new EventEmitter();


  private _stopArrows = false;

  @ViewChild('imgRef') img;
  @ViewChild('editCanvas') canvas;
  @ViewChild('toolbox') toolbox;
  @ViewChild('downloadTag') downloadTag;

  public service: PdfWysiwygService;

  @HostListener('document:keydown', ['$event']) cKdown(e: KeyboardEvent) {

    if (this.service.hasFocus && e.keyCode === 13) { e.preventDefault(); } // Prevent text area return
    if (this.service.hasFocus) { return; }

    this.canvasKey(e);
    if ([37, 38, 39, 40].indexOf(e.keyCode) > -1 && this.item &&
        !this._stopArrows) {
      e.preventDefault();
    }
  }

  constructor(private globalPdfService: PdfWysiwygService) {}

  ngOnInit() {
    this.service = this.pdfService || this.globalPdfService;
    if (this.svg) { this.service.svg = this.svg; }
    if (this.ident) { this.service.ident = this.ident; }
    if (this.width) { this.service.pixelWidth = this.width; }
    if (this.height) { this.service.pixelHeight = this.height; }
    if (this.viewScale) { this.service.viewScale = this.viewScale; }
    if (this.pdfScale) { this.service.pdfScale = this.pdfScale; }

    // this.service.itemsUpdated.subscribe(evt => {
    //   console.log('Updated', evt);
      // this.data = evt;
    // });

    this.addPdfKit();
    this.addBlobStream();
    this.addSvgToPdf();

  }

  ngAfterViewInit() {
    if (this.service.editable) {
      this.service.canvas = this.canvas;
      this.service.ctx = this.canvas.nativeElement.getContext('2d');
    }
  }

  resizeCanvas() {
    if (this.service.editable) {
      this.service.ctx.canvas.width = this.img.nativeElement.width;
      this.service.ctx.canvas.height = this.img.nativeElement.height;
      this.draw();
    }
  }

  saveStorage() {
    this.save.emit(this.data);
  }


  itemChanged(event, obj) {
    if (!this.service.editable) { return; }
    obj = event;
    this.draw();
  }
  itemFocused(_event, item: IPdfWysiwygItem) {
    if (!this.service.editable) { return; }
    this.service.changeItem(item);
    this.service.hasFocus = true;
  }
  itemLost(_event) {
    if (!this.service.editable) { return; }
    this.service.hasFocus = false;
  }

  itemClicked(_event, item: IPdfWysiwygItem) {
    // if (!this.service.editable) { return; }
    if (item.t === 'cross') {
      item.obj.selected = !item.obj.selected || false;
    }
  }
  stopArrows(event) {
    this._stopArrows = event;
  }

  draw() {
    if (this.service.displayMode === 'edit') {
      this.service.drawAll();
    }
    // console.log(this.data);
    this.saveStorage();
  }


  /*drawCircle(r) {
    if (this.service.displayMode !== 'edit') { return; }

    const item = this.data[r].obj;

    if (this.data[r].id === this.item.id) {
      this.service.ctx.fillStyle = 'rgba(255, 30, 30, 0.25)';
    } else {
      this.service.ctx.fillStyle = 'rgba(30, 255, 30, 0.25)';
    }
    this.service.ctx.beginPath();
    this.service.ctx.arc(item.x, item.y, item.w / 2, 0, 2 * Math.PI);
    this.service.ctx.fill();
  }*/


  // Mouse Event on Canvas
  canvasEvent(event: MouseEvent) {
    if (this.service.displayMode !== 'edit') { return; }

    if (
      (event.type === 'mousemove' || event.type === 'touchmove' || event.type === 'mouseout') &&
      !this.service.isDown) {
      // Ignore mouse move Events if we're not dragging
      return;
    }

    const mouseXScaled = event.offsetX / this.service.viewScale,
          mouseYScaled = event.offsetY / this.service.viewScale,
          mouseX = ToolUtils.roundFloat(mouseXScaled, .25, 2),
          mouseY = ToolUtils.roundFloat(mouseYScaled, .25, 2);
          // shifted = event.shiftKey;

    event.preventDefault();
    switch (event.type) {
      case 'mousedown':
      case 'touchstart':
        this.service.startX = mouseX;
        this.service.startY = mouseY;

        // if there isn't any items yet
        if (!this.data.length) {
          this.service.createItem(mouseX - 1, mouseY - 1, this.service.toolType);
          this.service.dragBR = true;
          this.service.isDown = true;

        // check for handles
        } else if (
          this.item && this.item.obj &&
          typeof this.item.obj.checkHandle_TR === 'function' &&
          this.item.obj.checkHandle_TR(mouseX, mouseY)
        ) {
          this.service.dragTR = true;
          this.service.isDown = true;
        } else if (
          this.item && this.item.obj &&
          typeof this.item.obj.checkHandle_TL === 'function' &&
          this.item.obj.checkHandle_TL(mouseX, mouseY)
        ) {
          this.service.dragTL = true;
          this.service.isDown = true;
        } else if (
          this.item && this.item.obj &&
          typeof this.item.obj.checkHandle_BR === 'function' &&
          this.item.obj.checkHandle_BR(mouseX, mouseY)
        ) {
          this.service.dragBR = true;
          this.service.isDown = true;
        } else if (
          this.item && this.item.obj &&
          typeof this.item.obj.checkHandle_BL === 'function' &&
          this.item.obj.checkHandle_BL(mouseX, mouseY)
        ) {
          this.service.dragBL = true;
          this.service.isDown = true;
        } else if (
          this.item && this.item.obj &&
          // typeof this.item.obj.hasCollision === 'function' &&
          this.item.obj.hasCollision(mouseX, mouseY)
        ) {
          this.service.dragWhole = true;
          this.service.isDown = true;

        } else {
          // Try to find anything that collides
          this.item = ToolUtils.collides(this.data, mouseX, mouseY);

          if (this.service.toolType !== 'selection' && this.item) {
            this.service.dragWhole = true;
            this.service.isDown = true;
          } else if (this.service.toolType !== 'selection' && !this.item) {
            // create input on canvas click anywhere, annoying unless you want it on
            this.service.createItem(mouseX - 1, mouseY - 1, this.service.toolType);
            // if (this.service.toolType === 'textbox') {
              this.service.dragBR = true;
              this.service.isDown = true;
            // }
          }

        }

      break;
      case 'mousemove':
      case 'touchmove':
        if (!this.service.isDown || this.service.toolType === 'selection') { return; }
        if (
          Math.abs(mouseX - this.service.startX) > this.service.closeEnough ||
          Math.abs(mouseY - this.service.startY) > this.service.closeEnough
        ) { this.service.isDrag = true; }

        // Swap Drag Corners
        if (this.service.dragBR &&
            this.item && this.item.obj &&
            typeof this.item.obj.checkSwapBRTR === 'function' &&
            this.item.obj.checkSwapBRTR(mouseX, mouseY)) {
          this.service.dragBR = false;
          this.service.dragTR = true;
          this.item.obj.y -= this.item.obj.h;
        } else if (this.service.dragBR &&
            this.item && this.item.obj &&
            typeof this.item.obj.checkSwapBRBL === 'function' &&
            this.item.obj.checkSwapBRBL(mouseX, mouseY)) {
          this.service.dragBR = false;
          this.service.dragBL = true;
          this.item.obj.x -= this.item.obj.w;
        } else if (this.service.dragTR &&
            this.item && this.item.obj &&
            typeof this.item.obj.checkSwapTRBR === 'function' &&
            this.item.obj.checkSwapTRBR(mouseX, mouseY)) {
          this.service.dragTR = false;
          this.service.dragBR = true;
          this.item.obj.y += this.item.obj.h;
        } else if (this.service.dragTR &&
            this.item && this.item.obj &&
            typeof this.item.obj.checkSwapTRTL === 'function' &&
            this.item.obj.checkSwapTRTL(mouseX, mouseY)) {
          this.service.dragTR = false;
          this.service.dragTL = true;
          this.item.obj.x -= this.item.obj.w;
        } else if (this.service.dragBL &&
            this.item && this.item.obj &&
            typeof this.item.obj.checkSwapBLTL === 'function' &&
            this.item.obj.checkSwapBLTL(mouseX, mouseY)) {
          this.service.dragBL = false;
          this.service.dragTL = true;
          this.item.obj.y -= this.item.obj.h;
        } else if (this.service.dragBL &&
            this.item && this.item.obj &&
            typeof this.item.obj.checkSwapBLBR === 'function' &&
            this.item.obj.checkSwapBLBR(mouseX, mouseY)) {
          this.service.dragBL = false;
          this.service.dragBR = true;
          this.item.obj.x += this.item.obj.w;
        } else if (this.service.dragTL &&
            this.item && this.item.obj &&
            typeof this.item.obj.checkSwapTLBL === 'function' &&
            this.item.obj.checkSwapTLBL(mouseX, mouseY)) {
          this.service.dragTL = false;
          this.service.dragBL = true;
          this.item.obj.y += this.item.obj.h;
        } else if (this.service.dragTL &&
            this.item && this.item.obj &&
            typeof this.item.obj.checkSwapTLTR === 'function' &&
            this.item.obj.checkSwapTLTR(mouseX, mouseY)) {
          this.service.dragTL = false;
          this.service.dragTR = true;
          this.item.obj.x += this.item.obj.w;
        }


        // Update Drag Coords
        if (this.service.dragWhole) {
          const diffX = mouseX - this.service.startX,
                diffY = mouseY - this.service.startY;
          this.item.obj.x += diffX;
          this.item.obj.y += diffY;
          this.service.startX = mouseX;
          this.service.startY = mouseY;
        } else if (this.service.dragTL) {
          if (typeof this.item.obj.updateDragTL === 'function') {
            this.item.obj.updateDragTL(mouseX, mouseY);
          } else {
            this.item.obj.w += this.item.obj.x - mouseX;
            this.item.obj.h += this.item.obj.y - mouseY;
            this.item.obj.x = mouseX;
            this.item.obj.y = mouseY;
          }
        } else if (this.service.dragTR) {
          if (typeof this.item.obj.updateDragTR === 'function') {
            this.item.obj.updateDragTR(mouseX, mouseY);
          } else {
            this.item.obj.w = Math.abs(this.item.obj.x - mouseX);
            this.item.obj.h += this.item.obj.y - mouseY;
            this.item.obj.y = mouseY;
          }
        } else if (this.service.dragBL) {
          if (typeof this.item.obj.updateDragBL === 'function') {
            this.item.obj.updateDragBL(mouseX, mouseY);
          } else {
            this.item.obj.w += this.item.obj.x - mouseX;
            this.item.obj.h = Math.abs(this.item.obj.y - mouseY);
            this.item.obj.x = mouseX;
          }
        } else if (this.service.dragBR) {
          if (typeof this.item.obj.updateDragBR === 'function') {
            this.item.obj.updateDragBR(mouseX, mouseY);
          } else {
            this.item.obj.w = Math.abs(this.item.obj.x - mouseX);
            this.item.obj.h = Math.abs(this.item.obj.y - mouseY);
          }
        }

        this.draw();
      break;
      case 'touchcancel':
      case 'mouseup':
      case 'touchend':
      case 'mouseout':
        this.service.isDown = false;
        /*
        // Check collides
        if (!this.service.isDrag) {
          const colItem = ToolUtils.collides(this.data, mouseX, mouseY);
          if (colItem && this.service.activeItem !== colItem) {
            this.service.activeItem = colItem;
          }
        }
        */
        this.draw();
        this.service.clearDrag();
      break;
    }
  }

  // Keyboard Events on Canvas
  canvasKey(event: KeyboardEvent) {
    const key = event.keyCode,
          shifted = event.shiftKey,
          ctrled = event.ctrlKey,
          alted = event.altKey,
          moveAmt = (shifted) ? 5 : 1;

    if (!this.item || !this.item.obj || this._stopArrows) { return; }

    if (key === 27 && this.service.editable) {
      this.service.changeItem(null);
      this.draw();
    }

    // Move Item around with Arrow Keys, Shift increases movement to 5px
    if (key === 38 && alted) { this.item.obj.h -= moveAmt;
    } else if (key === 38) { this.item.obj.y -= moveAmt;
    } else if (key === 40 && alted) { this.item.obj.h += moveAmt;
    } else if (key === 40) { this.item.obj.y += moveAmt;
    } else if (key === 37 && alted) { this.item.obj.w -= moveAmt;
    } else if (key === 37) { this.item.obj.x -= moveAmt;
    } else if (key === 39 && alted) { this.item.obj.w += moveAmt;
    } else if (key === 39) { this.item.obj.x += moveAmt;
    }

    // Redraw if arrow keys or delete key pressed
    if ([37, 38, 39, 40].indexOf(key) > -1) { this.draw(); }

    // poor attempt at an undo
    if (ctrled && key === 90) {
      // Ctrl-Z
      alert('Haha, Undo is for whimps!');
    } else if (ctrled && key === 67) {
      this.service.copyItem(this.item);
    }
  }

  // PDF Functions
  makePDF(_forceDownload = false) {
    const doc = new PDFDocument({
      margin: 0,
      autoFirstPage: false
    }),
    cssWidth = this.img.nativeElement.width,
    cssHeight = this.img.nativeElement.height,

    pdfWidth = this.service.pixelWidth || cssWidth,
    pdfHeight = this.service.pixelHeight || cssHeight,
    pdfLayout = this.service.pdfLayout || this.layout,

    // pointWidth = (pdfWidth / 72) * 96,
    // pointHeight = (pdfHeight / 72) * 96,
    pdfScale = this.service.pdfScale || 1;


console.log('Css', cssWidth, cssHeight);
console.log('pdf', pdfWidth, pdfHeight);
// console.log('point', pointWidth, pointHeight);
console.log('pdfScale', pdfScale);


    doc.addPage({
      margins: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      },
      layout: pdfLayout,
      size: [(pdfWidth * pdfScale), (pdfHeight * pdfScale)]
    });

    const xhr = ToolUtils.fetchImage(this.service.svg);
    const stream = doc.pipe(blobStream());

    doc.save();

    SVGtoPDF(doc, xhr.responseXML.documentElement, 0, 0, { scale: pdfScale });

    doc.font('Courier-Bold');
    doc.fontSize(9);

    const fLen = this.data.length;
    for (let f = 0; f < fLen; f++) {
      const item = this.data[f];

      if (typeof item.obj.writePDF === 'function') {
        item.obj.writePDF(doc, pdfScale);
      }
    }


    // Static Coded PDF items
    // use doc.



    // const t = this;
    stream.on('finish', () => {
      // t.downloadTag.nativeElement.removeAttribute('download');

      if (window.navigator.msSaveOrOpenBlob) {
       window.navigator.msSaveOrOpenBlob(stream.toBlob('application/pdf'),
           ToolUtils.generateFilename()
       );
      } else {
        const url = stream.toBlobURL('application/pdf');

//        t.downloadTag.nativeElement.href = url;
//        if (forceDownload) {
//          t.downloadTag.nativeElement.setAttribute('download',
//              ToolUtils.generateFilename());
//        }
        // t.downloadTag.nativeElement.click();

        ToolUtils.getNativeWindow().location.assign(url);

        // ToolUtils.getNativeWindow().URL.revokeObjectURL(url);
      }
    });

    doc.end();
  }

  addPdfKit() {
    const script = document.createElement('script');
    script.src = 'library/pdfkit.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }
  addBlobStream() {
    const script = document.createElement('script');
    script.src = 'library/blob-stream-v0.1.2.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }
  addSvgToPdf() {
    const script = document.createElement('script');
    script.src = 'library/svgtopdf.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }
}
