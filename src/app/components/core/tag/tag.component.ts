import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent implements OnInit {
  input: string;
  @Input() cssClass: 'custom-color' | string;
  @Input() disabled: boolean;
  @Input() model: any[];
  @Input() pattern: RegExp;

  @Output() modelChange = new EventEmitter<any[]>();
  @Output() removed = new EventEmitter<any>();
  @Output() added = new EventEmitter<any>();

  constructor() {}

  updateModel(val: any) {
    this.model.push(val);
    this.modelChange.emit(this.model);
  }

  ngOnInit() {
    this.input = '';
    this.model = this.model || [];
  }

  remove($event: MouseEvent, item: any) {
    $event.stopPropagation();
    $event.preventDefault();

    if (this.disabled) {
      return;
    }
    this.model = this.model.filter((m) => m !== item);
    this.modelChange.emit(this.model);
    this.removed.emit({
      item,
      items: this.model,
    });
  }

  onAdd($event: any) {
    const item = this.input.trim();
    if (!item || (this.pattern && !this.pattern.test(item))) {
      return;
    }
    if (this.model.indexOf(item) !== -1) {
      return;
    }
    this.updateModel(item);
    this.input = '';
  }
}
