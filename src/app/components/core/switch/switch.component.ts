import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
})
export class SwitchComponent implements OnInit {
  @Input() cssClass: string;
  @Input() afterLabel: string;
  @Input() beforeLabel: string;
  @Input() color: any;
  @Input() disabled: boolean;
  @Input() model: boolean;
  @Input() confirm: (newState: boolean) => Promise<boolean>;
  @Output() modelChange = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {}

  async update($event: any, force: boolean = false) {
    let canChange = true;
    if (force && this.confirm) {
      canChange = await this.confirm($event);
    }
    this.model = canChange ? $event : !$event;
    this.modelChange.emit(this.model);
  }

  checkConfirmation($event: MouseEvent) {
    // @ts-ignore
    if (this.confirm) {
      $event.stopPropagation();
      $event.preventDefault();
      this.update(!this.model, true);
    }
  }
}
