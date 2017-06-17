import { Component, ViewChild, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { PdfWysiwygService } from '../../providers/pdf-wysiwyg-service';

@Component({
  selector: 'pdf-wysiwyg-transfer',
  templateUrl: './pdf-wysiwyg-transfer.html',
  styleUrls: [ './pdf-wysiwyg-transfer.css'.toString() ]
})
export class PdfWysiwygTransfer implements OnInit {

  service: PdfWysiwygService;

  @Output() runDraw = new EventEmitter();
  @ViewChild('TransferModal') TransferModal;
  @Input('pdfService') pdfService: any;

  saveType = '';
  transfer_version: string;
  versionSelect = '';
  saveData = '';
  versionList: any = [];

  _db = true;

  constructor(private globalPdfService: PdfWysiwygService) {}

  ngOnInit() {
    this.service = this.pdfService || this.globalPdfService;
  }

  changeVersion() {
    this.transfer_version = this.versionSelect;
  }
/*
  importData() {
    if (this._db && this.transfer_version !== '') {
      this.importFromDatabase();
    } else if (this.impData !== '') {
      this.importFromString(this.impData);
    }
  }

  importFromDatabase() {
    this.service.getFormVersions(this.service.ident, this.transfer_version).subscribe(data => {
      this.importFromString(data[0].data);
    });
    this.closeModal();
  }

  importFromString(data: string) {
    this.service.loadDataset(JSON.parse(data));
    this.runDraw.emit();
    this.closeModal();
  }*/

  notEmpty(evt: any) {
    if (evt.target.value === '') {
      evt.target.style.border = 'solid red';
    } else {
      evt.target.style.border = '1px solid grey';
    }
  }

  saveDataInfo() {
    if (this._db) {
      this.saveToDatabase();
    } else if (this.saveData !== '') {
      this.saveToFile(this.saveData);
    }
  }

  saveToDatabase() {
    this.service.saveFormVersion(this.service.allItems, this.service.ident, this.service.ver)
      .subscribe(data => {
        console.log(data);
    });
    this.closeModal();
  }

  saveToFile(name: string) {
    const fileData = JSON.stringify(this.service.allItems),
          fileBlob = new Blob([fileData], { type: 'application/json' });

    // IE11 & Edge
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(fileBlob, name);
    } else {
      const url = URL.createObjectURL(fileBlob),
            a = document.createElement('a');

      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      setTimeout(function() {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
      }, 0);
    }
    this.closeModal();
  }

  // Opens and closes the modal window
  openModal() {
    this.TransferModal.open();
  }

  closeModal() {
    this.TransferModal.close();
  }

  changeSaveType() {
    this._db = (this.saveType === 'Database') ? true : false;
  }
}
