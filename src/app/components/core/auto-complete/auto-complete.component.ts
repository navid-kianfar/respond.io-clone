import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild,} from '@angular/core';
import {debounceTime, switchMap, tap} from 'rxjs/operators';
import {HttpService} from '../../../services/core/http.service';
import {fromEvent} from 'rxjs';
import {MatMenuTrigger} from '@angular/material/menu';
import {OperationResult, OperationResultStatus} from "../../../lib/operation-result";
import {ListViewModel} from "../../../lib/types";

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss'],
})
export class AutoCompleteComponent implements OnInit {
  @Input() placeHolder?: string;
  @Input() disabled: boolean;
  @Input() items: any[];
  @Input() cssClass: string;
  @Input() readonly: boolean;
  @Input() backend: string;
  @Input() ltr: boolean;
  @Input() model: string[];
  @Output() modelChange = new EventEmitter<string[]>();
  @Output() pick = new EventEmitter<any>();
  @Output() startModify = new EventEmitter<string>();
  @Input() textField: string;
  @Input() valueField: string;
  @Input() waiting: boolean;
  @Input() backendParams: any;
  @Input() prependIcon: string;
  @Output() picked = new EventEmitter<any>();
  @Output() loaded = new EventEmitter<any>();
  @Output() itemsChange = new EventEmitter<ListViewModel[]>();
  @Input() pattern: RegExp;

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  isLoading: boolean;
  filtered: ListViewModel[];
  filterText: string;
  inputElement: HTMLInputElement;

  constructor(
    private readonly httpService: HttpService,
    private readonly ref: ElementRef
  ) {}

  displayFn(value: any) {
    return value;
  }

  ngOnInit() {
    if (!this.backend) {
      this.filtered = [...this.items];
    }
    this.inputElement = this.ref.nativeElement.querySelectorAll('input')[0];
    fromEvent(this.inputElement, 'input')
      .pipe(
        debounceTime(500),
        tap(() => {
          this.filtered = [];
          this.isLoading = true;
        }),
        switchMap((project) => {
          const search = this.inputElement.value;
          this.startModify.emit(search);
          if (!this.backend) {
            return this.filterLocally(search);
          }
          return this.httpService.post(this.backend, { search });
        })
      )
      .subscribe((data) => {
        if (data.status === OperationResultStatus.success) {
          this.filtered = data.data as any[];
        } else {
          this.filtered = [];
        }
        this.isLoading = false;
        if (this.filtered.length) {
          this.trigger.openMenu();
        } else {
          this.trigger.closeMenu();
        }
      });
  }

  filterLocally(search: string): Promise<OperationResult<any[]>> {
    return new Promise((resolve, reject) => {
      search = search.trim().toLowerCase();
      if (!search) {
        resolve(OperationResult.Success([...this.items]));
      }
      const filtered = this.items.filter(
        (i) =>
          i[this.textField].trim().toLowerCase().indexOf(search) !== -1 ||
          i[this.valueField].trim().toLowerCase().indexOf(search) !== -1
      );
      resolve(OperationResult.Success(filtered));
    });
  }

  update(item: any) {
    this.pick.emit(item.payload);
    this.model = this.model || [];
    if (this.model.indexOf(item[this.valueField]) !== -1) {
      return;
    }
    this.model.push(item[this.valueField]);
    this.modelChange.emit(this.model);
    this.inputElement.value = '';
  }

  hide(trigger: any) {
    setTimeout(() => {
      trigger.closePanel();
    }, 300);
  }
}
