import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { HttpService } from '../../../services/core/http.service';
import { MatMenuTrigger } from '@angular/material/menu';
import {TranslateService} from '../../../services/core/translate.service';
import {DropdownKnownList} from "../../../lib/enums";
import {EnumsService} from "../../../services/core/enums.service";
import {OperationResult, OperationResultStatus} from "../../../lib/operation-result";

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit, OnChanges {
  @Input() cssClass: 'custom-color' | string;
  @Input() autoPickFirst: boolean;
  @Input() disabled: boolean;
  @Input() disabledSort: boolean;
  @Input() knownList: DropdownKnownList;
  @Input() allowClear: boolean;
  @Input() multiple?: boolean;
  @Input() choose: boolean;
  @Input() chooseLabel: string;
  @Input() enum: string;
  @Input() except: any[];
  @Input() acceptOnly: any[];
  @Input() enumExcept: any[];
  @Input() enumInfo: boolean;
  @Input() waiting: boolean;
  @Input() filter: boolean;
  @Input() ltr: boolean;
  @Input() textField: string;
  @Input() valueField: string;
  @Input() backend: string;
  @Input() backendParams: any;
  @Input() backendMethod: string;
  @Input() prependIcon: string;
  @Input() model: any;
  @Input() items: any[];
  @Input() markField: string;
  @Input() confirm: (newState: any) => Promise<boolean>;

  @Output() picked = new EventEmitter<any>();
  @Output() loaded = new EventEmitter<any>();
  @Output() modelChange = new EventEmitter<any>();
  @Output() itemsChange = new EventEmitter<any[]>();
  @ViewChild(MatMenuTrigger, { static: false }) trigger: MatMenuTrigger;

  filterText: string;
  showPlate: boolean;
  selectedItem: any;
  emptyItem: any = {};

  constructor(
    private readonly httpService: HttpService,
    private readonly enumsService: EnumsService,
    private readonly translateService: TranslateService
  ) {}

  updateItems(val: any[]) {
    if (this.allowClear) {
      // const blank = {} as any;
      this.emptyItem[this.textField] = this.translateService.fromKey('ENUMS_WORK_FLOW_MODULE_NONE', true);
      this.emptyItem[this.valueField] = undefined;
      // val.unshift(blank);
    }
    this.items = val;
    this.itemsChange.emit(val);
  }

  updateModel(val: any) {
    this.model = val;
    this.modelChange.emit(val);
    this.picked.emit(val);
  }

  get text(): string {
    if (this.multiple){
      const markedItems = this.items.filter(s => s[this.markField]);
      if (markedItems.length === 1){
        return markedItems.pop()[this.textField];
      }
      return markedItems.length < 1 ? this.chooseLabel || 'PLEASE_CHOOSE' : markedItems.length + ' items selected';
    }
    const item = (this.items || []).find(
      (i) => i[this.valueField || 'value'] === this.model
    );
    if (item) {
      return item[this.textField || 'value'];
    }
    return this.chooseLabel || 'PLEASE_CHOOSE';
  }

  closePlate() {
    if (this.trigger) {
      this.trigger.closeMenu();
    }
  }

  ngOnInit() {
    this.markField = this.markField || 'markField';
    this.filterText = '';
    this.items = this.items || [];
    if (this.choose) {
      const def = {
        value: undefined,
        separator: false,
        text: this.chooseLabel || 'PLEASE_CHOOSE',
      };
      this.items.unshift(def);
      if (this.model === undefined) {
        this.onPick(def, undefined);
      }
    }
    if (this.enum) {
      this.items = this.enumsService.toList(
        this.enum,
        this.enumExcept,
        this.acceptOnly
      ).map(a => ({...a, text: this.translateService.fromKey(this.enumsService.translateKey(this.enum, a.value))}));
      setTimeout(() => {
        this.itemsChange.emit(this.items);
        this.loaded.emit(this.items);
      }, 100);
    }
    if (this.model && !this.selectedItem) {
      const found = (this.items || []).find(
        (i) => i[this.valueField || 'value'] === this.model
      );
      if (found) {
        this.onPick(found, undefined);
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["backend"] && this.backend) {
      this.load();
      this.selectedItem = undefined;
      if (!changes["backend"].firstChange) {
        this.model = undefined;
      }
    }
    if (
      this.autoPickFirst &&
      !this.model &&
      changes["items"] &&
      changes["items"].currentValue &&
      changes["items"].currentValue.length
    ) {
      setTimeout(
        () => this.onPick(changes["items"].currentValue[0], undefined, true),
        20
      );
    }
  }

  async load() {
    this.disabled = true;
    this.waiting = true;
    const method = (this.backendMethod || 'GET').toLowerCase();
    // @ts-ignore
    const op: OperationResult<any> = await this.httpService[method]<any[]>(
      this.backend,
      this.backendParams
    );
    this.disabled = false;
    this.waiting = false;
    if (op.status === OperationResultStatus.success) {
      if (this.acceptOnly) {
        op.data = op.data.filter(
          (d: any) => (this.acceptOnly || []).indexOf(d[this.valueField]) !== -1
        );
      }
      const remaining = op.data.filter(
        (d: any) => (this.except || []).indexOf(d[this.valueField]) === -1
      );
      this.updateItems(remaining);
      this.checkSelectedItem();
      this.loaded.emit(op.data);
    }
  }

  toggle() {
    if (this.disabled) {
      return;
    }
    if (this.trigger) {
      this.trigger.toggleMenu();
    }
  }

  async onPick(item: any, $event?: MouseEvent, trigger: boolean = false) {
    if ($event) {
      $event.stopPropagation();
      $event.preventDefault();
    }

    if (this.disabled) {
      return;
    }
    if (this.trigger) {
      this.trigger.closeMenu();
      this.filterText = '';
    }

    let canChange = true;
    if (trigger && this.confirm) {
      canChange = await this.confirm(item);
    }
    if (canChange) {
      this.selectedItem = item;
      if (trigger) {
        this.updateModel(item[this.valueField || 'value']);
      }
    }
  }

  compare(item: any) {
    return this.model === item[this.valueField || 'value'];
  }

  clear($event?: Event) {
    $event?.stopPropagation();
    $event?.preventDefault();
    if (this.trigger) {
      this.trigger.closeMenu();
    }
    this.selectedItem = undefined;
    this.model = undefined;
    this.modelChange.emit(undefined);
  }

  checkSelectedItem() {
    if (this.model) {
      const found = (this.items || []).find(
        (i) => i[this.valueField || 'value'] === this.model
      );
      if (found) {
        this.onPick(found, undefined);
      }
    }
  }

  onPlateOpen(input: HTMLInputElement) {
    setTimeout(() => input.focus(), 100);
  }

  onChecked($event: MouseEvent, item: any) {
    $event.preventDefault();
    $event.stopPropagation();
    item[this.markField] = !item[this.markField];
    console.log(item);
  }

  prePick(item: any, $event: MouseEvent, trigger: boolean) {
    if (this.multiple) {
      return this.onChecked($event, item);
    }

    return this.onPick(item, $event, trigger);
  }
}
