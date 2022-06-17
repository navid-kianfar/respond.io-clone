import { Pipe, PipeTransform } from '@angular/core';
import {CulturedDateService} from "../services/core/cultured-date.service";

@Pipe({
  name: 'culturedDate',
})
export class CulturedDatePipe implements PipeTransform {
  constructor(private readonly culturedDateService: CulturedDateService) {}

  transform(date: string | Date, time?: boolean, format?: string): string {
    format = format || (time ? 'DD/MM/YYYY HH:mm:ss' : 'DD/MM/YYYY');
    return this.culturedDateService.utcToLocalFormatted(date, format);
  }
}
