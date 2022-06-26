import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() disabled: boolean;
  @Input() cssClass: string;
  @Input() readonly: boolean;
  @Input() numeric: boolean;
  @Input() password: boolean;
  @Input() textArea: boolean;
  @Input() growable?: boolean;
  @Input() appendIcon?: string;
  @Input() prependIcon?: string;
  @Input() label?: string;
  @Input() ltr?: boolean;
  @Input() autofocus?: boolean;
  @Input() placeHolder?: string;
  @Input() rows?: number;
  @Input() model: string;
  @Input() description: string;

  @Output() modelChange = new EventEmitter<string>();
  @Output() pressEnter = new EventEmitter<KeyboardEvent>();
  @Output() blur = new EventEmitter<any>();
  @Output() focus = new EventEmitter<any>();

  focusState: string;
  isPasswordInput: boolean;

  constructor() {}

  ngOnInit() {
    this.isPasswordInput = this.password;
    this.focusState = 'no-focus';
    this.ltr = this.ltr || this.numeric;
  }

  onFocus() {
    this.focusState = 'focus';
    this.focus.emit();
  }

  onBlur() {
    this.focusState = 'blur';
    this.blur.emit();
  }

  onEnter() {
    this.pressEnter.emit();
  }

  onModelChange(value: string) {
    this.model = value;
    this.modelChange.emit(value);
  }

  togglePassword(){
    this.password = !this.password;
  }
}
