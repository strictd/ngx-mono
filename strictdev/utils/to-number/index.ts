import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToNumberPipe } from './to-number-pipe';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ ToNumberPipe ],
  exports:      [ ToNumberPipe ]
})
export class ToNumberModule { }
