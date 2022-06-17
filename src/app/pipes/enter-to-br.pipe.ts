import { Pipe, PipeTransform } from '@angular/core';
import {StringHelpers} from "../lib/helpers/string.helpers";

@Pipe({
  name: 'enterToBr',
})
export class EnterToBrPipe implements PipeTransform {
  transform(value: string): string {
    return StringHelpers.trim(value || '', '\r\n')
      .replace(/\r\n/g, '<br/>')
      .replace(/\n\r/g, '<br/>')
      .replace(/\r/g, '<br/>')
      .replace(/\n/g, '<br/>');
  }
}
