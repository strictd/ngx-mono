import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinner } from './views/loading-spinner';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ LoadingSpinner ],
  exports:      [ LoadingSpinner ]
})
export class LoadingSpinnerModule { }
