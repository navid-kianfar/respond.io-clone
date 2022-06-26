import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent implements OnInit {
  @Input() model: string;
  @Input() disabled: boolean;
  @Input() cssClass: string;
  @Input() readonly: boolean;
  @Input() placeholder: string;
  @Output() modelChange = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
    this.model = this.model || '#000000';
  }

  updateModel($event: string) {
    this.model = $event;
    this.modelChange.emit(this.model);
  }
}
