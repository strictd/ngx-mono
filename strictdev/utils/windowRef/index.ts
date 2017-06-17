import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowRef } from './window-ref';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ WindowRef ],
  exports:      [ WindowRef ]
})
export class WindowRefModule { }
