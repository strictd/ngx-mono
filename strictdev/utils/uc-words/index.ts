import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UcWordsPipe } from './uc-words';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ UcWordsPipe ],
  exports:      [ UcWordsPipe ]
})
export class UcWordsModule { }
