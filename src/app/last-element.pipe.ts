import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lastElement'
})
export class LastElementPipe implements PipeTransform {

  transform(array: []): number[] {
    let myArray = array.slice(array.length - 1)
    console.log(myArray);

    return myArray;
  }

}
