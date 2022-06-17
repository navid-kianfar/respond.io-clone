import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as momentTimezone from 'moment-timezone';

@Injectable({
  providedIn: 'root',
})
export class CulturedDateService {
  constructor() {}

  utcToLocal(utcDateTime: any, tz = ''): moment.Moment {
    const obj = momentTimezone(utcDateTime);
    if (obj.isLocal()) {
      return obj;
    }
    return momentTimezone.utc(utcDateTime).local();
  }

  localToUtc(local: Date): Date {
    return momentTimezone(local).utc().toDate();
  }

  utcToLocalFormatted(utcDateTime: any, format: string, tz = ''): string {
    const local = this.utcToLocal(utcDateTime, tz);
    if (!local) {
      return '';
    }
    return local.format(format);
  }

  utcToLocalAgo(utcDateTime: any, tz = '') {
    const local = this.utcToLocal(utcDateTime, tz);
    if (!local) {
      return '';
    }
    return local.fromNow(true);
  }

  extractTime(model: Date, tz = ''): { hour: number; minute: number } {
    const local = this.utcToLocal(model, tz);
    return {
      hour: local.hour(),
      minute: local.minute(),
    };
  }

  patchTime(date: Date, time: string, tz = ''): Date {
    const parts = (time || '00:00').split(':');
    const hours = +parts[0];
    const minutes = +parts[1];
    const seconds = (hours === minutes && minutes === 0) ? 1 : 0;
    return this.utcToLocal(date, tz)
      .hour(hours)
      .minute(minutes)
      .second(seconds)
      .toDate();
  }

  // toString(value: string | Date, time?: boolean, format?: string): string {
  //   if (!value) {
  //     return '';
  //   }
  //   value = new Date(this.fixZone(value));
  //   format = format || (time ? 'DD/MM/YYYY HH:mm:ss' : 'DD/MM/YYYY');
  //   return this.utcToLocalFormatted(value, format);
  // }

  // fixZone(input: string|Date): string|Date {
  //   if (input && typeof input === 'string') {
  //     return input.replace('Z', '0');
  //   }
  //   return input;
  // }
}
