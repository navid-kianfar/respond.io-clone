import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';

import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { DeviceDetectorService } from 'ngx-device-detector';

export const ETHOS_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MM/YYYY',
  },
};

@Component({
  selector: 'app-native-date-picker',
  templateUrl: './native-date-picker.component.html',
  styleUrls: ['./native-date-picker.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: ETHOS_DATE_FORMAT },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {
      provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS,
      useValue: { useUtc: true, strict: true },
    },
  ],
})
export class NativeDatePickerComponent implements OnInit, AfterViewInit {
  @Input() range: boolean;
  @Input() time: boolean;
  @Input() placeholder: string;
  @Input() cssClass: string;
  @Input() culture: string;
  @Input() disabled: boolean;
  @Input() allowNull: boolean;
  @Input() pickButton: boolean;
  @Input() plateOpen: boolean;
  @Input() min: Date | string;
  @Input() max: Date | string;
  @Input() model: Date;
  @Input() modelEnd: Date;
  @Input() minDays: number;
  @Input() minMonths: number;
  @Input() minYears: number;
  @Input() maxDays: number;
  @Input() maxMonths: number;
  @Input() maxYears: number;
  @Input() fromToday: boolean;
  @Input() tillToday: boolean;
  @Output() modelChange = new EventEmitter<Date>();
  @Output() modelEndChange = new EventEmitter<Date>();
  @Output() cultureChange = new EventEmitter<string>();

  mask = {
    guide: true,
    showMask: false,
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
  };

  constructor(private readonly deviceDetector: DeviceDetectorService) {}

  ngAfterViewInit(): void {}

  ngOnInit(): void {}

  onOpen() {}

  switchCulture() {
    this.culture = this.culture === 'fa' ? 'en' : 'fa';
    this.cultureChange.emit(this.culture);
  }

  forceCulture(culture: string) {
    this.culture = culture;
    this.cultureChange.emit(culture);
  }
}
