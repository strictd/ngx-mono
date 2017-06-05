import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoGrowDirective } from './auto-grow';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ AutoGrowDirective ],
  exports:      [ AutoGrowDirective ]
})
export class AutoGrowModule { }
