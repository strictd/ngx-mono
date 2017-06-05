import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetFocusDirective } from './set-focus';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ SetFocusDirective ],
  exports:      [ SetFocusDirective ]
})
export class SetFocusModule { }
