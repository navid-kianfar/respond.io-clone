import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {

  private order(source: any[], sortBy: string): any[] {
    if (!sortBy) {
      return source;
    }

    return source.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) {
        return -1;
      }
      if (a[sortBy] > b[sortBy]) {
        return 1;
      }
      return 0;
    });
  }

  public transform(value: any, keys: string[], term: string, sort: string = ''): any[] {
    keys = keys || [];
    term = (term || '').trim().toLowerCase();
    value = value || [];
    if (!term) {
      return this.order(value, sort);
    }

    const unSorted = value.filter((item: any) => {
      let found = false;
      keys.forEach((key) => {
        if (item && item[key] && item[key].toString().trim().toLowerCase().indexOf(term) !== -1) {
          found = true;
        }
      });
      return found;
    });
    return this.order(unSorted, sort);
  }
}
