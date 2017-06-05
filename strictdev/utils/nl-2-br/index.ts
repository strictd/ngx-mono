import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Nl2BrPipe } from './nl-2-br';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ Nl2BrPipe ],
  exports:      [ Nl2BrPipe ]
})
export class Nl2BrModule { }
