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

@Component({
  selector: 'app-country-picker',
  templateUrl: './country-picker.component.html',
  styleUrls: ['./country-picker.component.scss'],
})
export class CountryPickerComponent implements OnInit, OnChanges {
  @Input() mini: boolean;
  @Input() showCode: boolean;
  @Input() disabled: boolean;
  @Input() model: string;
  @Output() modelChange = new EventEmitter<string>();
  @Output() picked = new EventEmitter<any>();
  selected: any;
  filterText: string;

  constructor(readonly countryService: CountriesService) {}

  ngOnInit(): void {
    this.filterText = '';
    setTimeout(() => {
      const found = this.countryService.list.find(
        (i) => (!this.model && i.code === 'TR') || this.model === i.name
      );
      this.pick(found);
    }, 100);
  }

  pick(country: any) {
    this.selected = { ...country };
    this.model = country.name;
    this.modelChange.emit(this.model);
    this.picked.emit(country);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["model"] && !changes["model"].firstChange) {
      if (!changes["model"].currentValue) {
        this.selected = null;
        return;
      }
      if (changes["model"].currentValue !== this.selected?.name) {
        const found = this.countryService.list.find(
          (i) => i.name === changes["model"].currentValue
        );
        if (found) {
          this.pick(found);
        }
      }
    }
  }

  onPlateOpen(input: HTMLInputElement) {
    setTimeout(() => input.focus(), 100);
  }
}
