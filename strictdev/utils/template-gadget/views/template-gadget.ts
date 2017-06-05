import { Component, Input } from '@angular/core';

@Component({
  selector: 'template-gadget',
  template: `
  <div #templateGadgetRoot [class]="'template-gadget ' + gadgetClass" [style.margin]="margin" [style.padding]="padding">
      <div class="gadget-content" tabindex="0">
        <div class="div-table template-gadget-header">
          <div class="div-table-col gadget-title" *ngIf="gadgetTitle">{{ gadgetTitle }}</div>
          <div class="div-table-col gadget-help"></div>
          <div class="div-table-col gadget-toggle" (click)="toggleIsOpened()"><img src="img/adown.gif" *ngIf="!isOpened" /><img src="img/aup.gif" *ngIf="isOpened" /></div>
        </div>
        <div class="template-gadget-linkbar">
          <ng-content select="gadget-link.template-gadget-link-top"></ng-content>
        </div>
        <div class="template-gadget-body" *ngIf="isOpened">
          <div class="template-gadget-linkbar">
            <ng-content select="gadget-link.template-gadget-link-inside-top" [ngStyle]="{'border-bottom': '1px solid black', 'overflow': 'auto', 'width': '99%', 'white-space': 'nowrap', 'text-align': 'left'}"></ng-content>
          </div>
          <ng-content select="gadget-body"></ng-content>
          <div class="template-gadget-linkbar">
            <ng-content select="gadget-link.template-gadget-link-inside-bottom"></ng-content>
          </div>
        </div>

        <div class="template-gadget-linkbar">
          <ng-content select="gadget-link.template-gadget-link-bottom"></ng-content>
        </div>
        <div class="template-gadget-footer">
          <ng-content select="gadget-footer"></ng-content>
        </div>
      </div>
  </div>
  `,
  styleUrls: [ './template-gadget.css'.toString() ]
})
export class TemplateGadget {
  @Input() gadgetClass = '';
  @Input() gadgetTitle = '';
  @Input() margin = '';
  @Input() padding = '';

  // @ViewChild("templateGadgetRoot")
  // private templateGadgetRoot: ElementRef;

  isOpened = true;

  toggleIsOpened() {
    this.isOpened = !this.isOpened;
  }
}

@Component({
    selector: 'gadget-header',
    template: `<ng-content></ng-content>`
})
export class TemplateGadgetHeader {

}

@Component({
    selector: 'gadget-body',
    template: `<ng-content></ng-content>`
})
export class TemplateGadgetBody {

}

@Component({
    selector: 'gadget-footer',
    template: `<ng-content></ng-content>`
})
export class TemplateGadgetFooter {

}

@Component({
    selector: 'gadget-link',
    template: `<ng-content></ng-content>`
})
export class TemplateGadgetLink {

}
