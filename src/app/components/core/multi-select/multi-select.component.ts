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
import { MatMenuTrigger } from '@angular/material/menu';
import { HttpService } from '../../../services/core/http.service';
import {EnumsService} from "../../../services/core/enums.service";
import {OperationResult, OperationResultStatus} from "../../../lib/operation-result";

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
})
export class MultiSelectComponent implements OnInit, OnChanges {
  @Input() cssClass: 'custom-color' | string;
  @Input() disabled: boolean;
  @Input() allowClear: boolean;
  @Input() choose: boolean;
  @Input() chooseLabel: string;
  @Input() except: any[];
  @Input() acceptOnly: any[];
  @Input() waiting: boolean;
  @Input() ltr: boolean;
  @Input() textField: string;
  @Input() valueField: string;
  @Input() backend: string;
  @Input() backendParams: any;
  @Input() prependIcon: string;
  @Input() model: any[];
  @Input() items: any[];
  @Input() filter: boolean;
  @Input() enum: string;
  @Input() enumExcept: any[];

  @Output() removed = new EventEmitter<any>();
  @Output() picked = new EventEmitter<any>();
  @Output() loaded = new EventEmitter<any>();
  @Output() modelChange = new EventEmitter<any[]>();
  @Output() itemsChange = new EventEmitter<any[]>();
  @ViewChild(MatMenuTrigger, { static: false }) trigger: MatMenuTrigger;

  filterText: string;
  showPlate: boolean;
  selectedItems: any[];

  constructor(
    private readonly httpService: HttpService,
    private readonly enumsService: EnumsService
  ) {}

  updateItems(val: any[]) {
    this.items = val;
    this.itemsChange.emit(val);
  }

  updateModel(val: any) {
    this.model.push(val);
    this.modelChange.emit(this.model);
  }

  get text(): string {
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
    this.selectedItems = [];
    this.items = this.items || [];
    this.model = this.model || [];
    if (this.enum) {
      this.items = this.enumsService.toList(
        this.enum,
        this.enumExcept,
        this.acceptOnly
      );
      setTimeout(() => this.itemsChange.emit(this.items), 100);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["backend"] && this.backend) {
      this.load();
      if (!changes["backend"].firstChange) {
        this.model = [];
      }
    }
  }

  async load() {
    this.disabled = true;
    const op: OperationResult<any> = await this.httpService.get<any[]>(
      this.backend,
      this.backendParams
    );
    this.disabled = false;
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

  onPick(item: any, $event: MouseEvent, trigger: boolean = false) {
    if ($event) {
      $event.stopPropagation();
      $event.preventDefault();
    }

    if (this.disabled) {
      return;
    }
    if (this.trigger) {
      this.trigger.closeMenu();
    }
    if (trigger) {
      this.updateModel(item[this.valueField || 'value']);
    }
    this.picked.emit(item);
  }

  remove($event: MouseEvent, item: any) {
    $event.stopPropagation();
    $event.preventDefault();

    if (this.disabled) {
      return;
    }
    this.model = this.model.filter((m) => m !== item[this.valueField]);
    this.modelChange.emit(this.model);
    this.removed.emit({
      item,
      items: this.model,
    });
  }
}
