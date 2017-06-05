import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'template-component',
  templateUrl: './template.html',
  styleUrls: [ './template.scss'.toString() ]
})

export class TemplateComponent {
  isRegistering = false;
}
