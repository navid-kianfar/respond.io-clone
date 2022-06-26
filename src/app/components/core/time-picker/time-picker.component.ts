import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {NumberHelpers} from "../../../lib/helpers/number.helpers";

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
})
export class TimePickerComponent implements OnInit {
  @Input() cssClass: string;
  @Input() disabled: boolean;
  @Input() model: string;
  @Input() prependText: string;
  @Input() appendText: string;
  @Output() modelChange = new EventEmitter<string>();

  timeValues: any[];

  constructor() {}

  ngOnInit(): void {
    this.model = this.model || '00:00';
    this.timeValues = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 5) {
        this.timeValues.push({
          hour,
          minute,
          text: `${NumberHelpers.pad(hour, 2)}:${NumberHelpers.pad(minute, 2)}`,
        });
      }
    }
  }

  updateTime($event: any) {
    if ($event.indexOf('_') !== -1) {
      return;
    }
    this.model = $event;
    this.modelChange.emit(this.model);
  }

  setTime(btn: any) {
    this.model = btn.text;
    this.modelChange.emit(this.model);
  }
}
