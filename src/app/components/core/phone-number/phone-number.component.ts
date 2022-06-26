import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {CountriesService} from "../../../services/core/countries.service";
import {StringHelpers} from "../../../lib/helpers/string.helpers";

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['./phone-number.component.scss'],
})
export class PhoneNumberComponent implements OnInit, OnChanges {
  @Input() readonly: boolean;
  @Input() cssClass: string;
  @Input() placeHolder: string;
  @Output() blur = new EventEmitter<any>();
  @Output() focus = new EventEmitter<any>();
  @Input() disabled: boolean;
  @Input() model: string;
  @Output() modelChange = new EventEmitter<string>();

  focusState: string;
  countryCodes: any[];
  input: string;
  prefix: string;
  current: string;
  country: string;

  constructor(private readonly countryService: CountriesService) {}

  ngOnInit(): void {
    if (this.model) {
      setTimeout(() => this.patchValues(this.model), 100);
    }
  }

  onFocus() {
    this.focusState = 'focus';
    this.focus.emit();
  }

  onBlur() {
    this.focusState = 'blur';
    this.blur.emit();
  }

  updateNumber(input: string) {
    this.current = this.model = `${this.prefix}${StringHelpers.trimLeft(
      input,
      '0'
    )}`;
    this.modelChange.emit(this.model);
  }

  patchValues(input: string) {
    const parsed = this.countryService.parsePhoneNumber(input);
    if (!parsed) {
      return;
    }
    const found = this.countryService.list.find(
      (i) => i.code === parsed.country
    );
    if (!found) {
      return;
    }
    this.country = found.name;
    this.input = parsed.number;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["model"] && !changes["model"].firstChange) {
      if (!changes["model"].currentValue) {
        this.current = '';
        this.input = '';
        return;
      }
      if (changes["model"].currentValue !== this.current) {
        this.patchValues(changes["model"].currentValue);
      }
    }
  }

  updateCountry($event: any) {
    this.prefix = $event.dial_code.replace(' ', '');
    this.updateNumber(this.input);
  }

  onPaste(event: ClipboardEvent) {
    const clipboardData = event.clipboardData || (window as any).clipboardData;
    const pastedText = clipboardData.getData('text');
    if (pastedText.startsWith('00') || pastedText.startsWith('+')) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      this.current = '';
      this.input = '';
      this.model = pastedText;
      this.modelChange.emit(pastedText);
    }
  }
}
