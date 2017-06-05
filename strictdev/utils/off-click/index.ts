import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffClickDirective } from './off-click';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ OffClickDirective ],
  exports:      [ OffClickDirective ]
})
export class OffClickModule { }
