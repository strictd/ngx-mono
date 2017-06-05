import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'UcWords'
})
export class UcWordsPipe implements PipeTransform {
  transform(str: string) {
    return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
        return $1.toUpperCase();
    });
  }
}
