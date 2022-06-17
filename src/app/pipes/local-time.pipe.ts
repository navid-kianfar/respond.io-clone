import { Pipe, PipeTransform } from '@angular/core';
import {AppStateService} from "../services/core/app-state.service";
import {CulturedDateService} from "../services/core/cultured-date.service";

@Pipe({
  name: 'localTime',
})
export class LocalTimePipe implements PipeTransform {
  constructor(
    private readonly culturedDateService: CulturedDateService,
    private readonly appState: AppStateService
  ) {}

  transform(
    value: string | Date,
    seconds: boolean = false,
    format: string = ''
  ): string {
    format = format || (seconds ? 'HH:mm:ss ' : 'HH:mm');
    return this.culturedDateService.utcToLocalFormatted(
      value,
      format,
      this.appState.profile?.timeZone
    );
  }
}
