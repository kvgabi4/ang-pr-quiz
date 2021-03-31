import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorter'
})
export class SorterPipe implements PipeTransform {

  transform(value: any[], key: string): any[] {

    if (!Array.isArray(value) || !key) {
      return value;
    }

    return value.sort((a: any, b: any): any => {
      if (typeof a[key] === 'number' && typeof b[key] === 'number') {
        return a[key] - b[key];
      } else {
        const A: string = a[key].toString().toLowerCase();
        const B: string = b[key].toString().toLowerCase();
        return A.localeCompare(B);
      }
    })
  }
}
