import { Component, Input } from '@angular/core';

/*
 * <loading-spinner [show_spinner]="show" [not_found]="not_found"></loading-spinner>
 */

@Component({
    selector: 'loading-spinner',
    templateUrl: './loading-spinner.html',
    styleUrls: [ './loading-spinner.css'.toString() ]
})
export class LoadingSpinner {

  @Input() show_spinner = false;
  @Input() not_found = false;
  @Input() showError = false;
  @Input() classes;
}
