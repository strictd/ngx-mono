import { Component, OnInit } from '@angular/core';

import { PdfWysiwygService } from '../../../../../../strictdev/utils/pdf-wysiwyg/providers/pdf-wysiwyg-service';

@Component({
  selector: 'registration-form-component',
  templateUrl: './registration-form.html'
})
export class RegistrationFormComponent implements OnInit {

  service: PdfWysiwygService;
  addedStyle = { 'border': '0px' };
  edit = true;

  constructor(_service: PdfWysiwygService) {
    this.service = new PdfWysiwygService(_service.madame);
    // this.service.inchWidth = 8.055;
    // this.service.inchHeight = 5.555;
    this.service.editable = false;
    this.service.ident = 'registration';


    // Links into the Hook array
    this.service.addHook('pre_save', (_cb) => {
      _cb(null);
    });

    this.service.addHook('save', (_cb) => {
      _cb(null);
    });

    this.service.addHook('post_save', (_cb) => {
      _cb(null);
    });

    this.service.addHook('autopopulate', (_cb) => {
      _cb(null);
    });

  }

  ngOnInit(): void {

  }


  requiredInput(): boolean {
    return this.service.allItems.every(data => {
      const exit = this.service.requiredInput(data);
      if (!exit) { return false; }
      // Do component specific requirements
      return true;
    });
  }
}
