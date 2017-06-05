import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UcWordsModule } from './uc-words';
import { ToNumberModule } from './to-number';
import { Nl2BrModule } from './nl-2-br';
import { HtmlUnsafeModule } from './html-unsafe';

@NgModule({
  imports: [
    CommonModule,

    UcWordsModule,
    ToNumberModule,
    Nl2BrModule,
    HtmlUnsafeModule
  ]
})
export class TextmodSharedModule { }
