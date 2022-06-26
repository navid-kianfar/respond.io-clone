import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import parsePhoneNumber from 'libphonenumber-js';

@Component({
  selector: 'app-flaged-phone-number',
  templateUrl: './flaged-phone-number.component.html',
  styleUrls: ['./flaged-phone-number.component.scss'],
})
export class FlagedPhoneNumberComponent implements OnInit, OnChanges {
  @Input() phone: string;
  parsed: any;
  constructor() {}

  ngOnInit(): void {
    this.update(this.phone);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["phone"]?.currentValue) {
      this.update(changes['phone'].currentValue);
    }
  }

  update(value: string = '') {
    this.parsed = null;
    if (value.startsWith('00')) {
      value = `+${value.substring(2)}`;
    }
    const parsed = parsePhoneNumber(value);
    if (parsed) {
      this.parsed = {
        flag: parsed.country,
        number: parsed.formatInternational(),
      };
    }
  }
}
