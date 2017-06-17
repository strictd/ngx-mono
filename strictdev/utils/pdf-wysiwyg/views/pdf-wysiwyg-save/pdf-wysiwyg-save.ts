import { Component, OnInit, Input } from '@angular/core';

import { PdfWysiwygService } from '../../providers/pdf-wysiwyg-service';

@Component({
  selector: 'pdf-wysiwyg-save',
  templateUrl: './pdf-wysiwyg-save.html',
  styleUrls: [ './pdf-wysiwyg-save.css'.toString() ]
})
export class PdfWysiwygSave implements OnInit {

  service: PdfWysiwygService;
  saveDisabled: boolean;
  showSaved: boolean;

  @Input('pdfService') pdfService: any;

  constructor(private globalPdfService: PdfWysiwygService) {}

  ngOnInit() {
    this.service = this.pdfService || this.globalPdfService;
  }

  saveInput() {
    this.pdfService.runHooks('pre_save').then(canSave1 => {
      if (canSave1) {
        this.pdfService.runHooks('save').then(canSave2 => {
          if (canSave2 && this.service.ver && this.service.save) {
            this.service.custLock = true;
            const newData = this.service.allItems.map(i => ({ id: i.id, val: i.obj.val}));
            const allData = { data: newData };
            if (this.service.data_id) { allData['data_id'] = this.service.data_id; }
            this.sendInput(allData);
          } else if (!this.service.save) {
            this.showSaved = true;
            setTimeout(() => this.showSaved = false, 5000);
          } else if (!canSave2) {
            alert('Error prevented saving data. Please try again, if problem persists talk to an administrator.')
          } else {
            alert('There is no version attached to this form.  Save/create a version in the editor'
                    + ' or go back and select a desired version before you can save data.');
          }
        });
      } else {
        // Didn't pass requirements to save
        alert('Did not pass requirements to save');
      }

    }).catch(err => alert(err));
  }

  sendInput(allData: any) {
    this.service.sendAction(this.service.ident, this.service.ver, 'saveInput', allData).subscribe(data => {
      this.showSaved = true;
      if (data) {
        if (!this.service.data_id) {
          this.service.data_id = data[0];
        } else if (this.service.data_id !== data[0]) { this.service.new_data_id = data[0]; }
        this.pdfService.runHooks('post_save').then(saved => {
          if (saved) {
            setTimeout(() => this.showSaved = false, 5000);
          } else {
            alert('Data was saved but post save operations failed.')
          }
        });
      }
    }, err => console.log(err));
  }

  autoFillForm() {
    // disable Save button
    this.saveDisabled = true;
    this.pdfService.runHooks('autopopulate').then(_bool => {
      this.saveDisabled = !_bool;
    });
  }

}
