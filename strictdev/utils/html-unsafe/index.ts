import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HtmlUnsafeDirective } from './html-unsafe';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ HtmlUnsafeDirective ],
  exports:      [ HtmlUnsafeDirective ]
})
export class HtmlUnsafeModule { }
