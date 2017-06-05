import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthNamePipe } from './month-name';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ MonthNamePipe ],
  exports: [ MonthNamePipe ]
})
export class MonthNameModule {}
