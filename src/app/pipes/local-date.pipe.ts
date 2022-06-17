import { Pipe, PipeTransform } from '@angular/core';
import {AppStateService} from "../services/core/app-state.service";
import {CulturedDateService} from "../services/core/cultured-date.service";

@Pipe({
  name: 'localDate',
})
export class LocalDatePipe implements PipeTransform {
  constructor(
    private readonly culturedDateService: CulturedDateService,
    private readonly appState: AppStateService
  ) {}

  transform(
    value: string | Date,
    time: boolean = false,
    format: string = ''
  ): string {
    format = format || (time ? 'DD/MM/YYYY HH:mm:ss' : 'DD/MM/YYYY');
    return this.culturedDateService.utcToLocalFormatted(
      value,
      format,
      this.appState.profile?.timeZone
    );
  }
}
