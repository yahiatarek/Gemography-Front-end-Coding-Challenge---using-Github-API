import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertingWatchers'
})
export class ConvertingWatchersPipe implements PipeTransform {

  transform(value: string): string {
    if (parseInt(value) > 1000) {
      let valueAsNo = parseInt(value) / 1000
      return valueAsNo.toString();
    } else {
      return value
    }
  }

}
