import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Nl2Br'
})
export class Nl2BrPipe implements PipeTransform {
  transform(str: string) {
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br />$2');
  }
}
