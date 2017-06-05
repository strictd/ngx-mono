import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MadameService } from './madame-service';
import { MadameSocket } from './madame-socket';
import { MadameAuth } from './madame-auth';

@NgModule({
  imports: [ CommonModule ],
  exports: [ CommonModule ]
})
export class MadameModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MadameModule,
      providers: [
        MadameService,
        MadameSocket,
        MadameAuth
      ]
    };
  }
}

