import { Component, OnInit } from '@angular/core';

import { PdfWysiwygService } from '../../providers/pdf-wysiwyg-service';

@Component({
  selector: 'pdf-wysiwyg-forms',
  templateUrl: './pdf-wysiwyg-forms.html'
})
export class PdfWysiwygForms implements OnInit {
  service: PdfWysiwygService;
  forms: any = [];

  constructor(_service: PdfWysiwygService) {
    this.service = _service;
  }

  ngOnInit() {
    this.service.getForms().subscribe(data => this.forms = data);
  }
}
