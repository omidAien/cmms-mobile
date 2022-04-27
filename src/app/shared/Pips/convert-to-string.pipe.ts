import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToString'
})
export class ConvertToStringPipe implements PipeTransform {

  transform(value: any): string {
    return value.toString();
  }

}
