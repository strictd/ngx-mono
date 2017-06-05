import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutoGrowModule } from './auto-grow';
import { SetFocusModule } from './set-focus';

@NgModule({
  imports: [
    CommonModule,

    AutoGrowModule,
    SetFocusModule
  ]
})
export class InputsSharedModule { }
