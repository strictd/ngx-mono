import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateGadget, TemplateGadgetHeader, TemplateGadgetBody, TemplateGadgetFooter, TemplateGadgetLink } from './views/template-gadget';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TemplateGadget,
    TemplateGadgetHeader,
    TemplateGadgetBody,
    TemplateGadgetFooter,
    TemplateGadgetLink
  ],
  exports: [
    TemplateGadget,
    TemplateGadgetHeader,
    TemplateGadgetBody,
    TemplateGadgetFooter,
    TemplateGadgetLink
  ],
})
export class TemplateGadgetModule {}
