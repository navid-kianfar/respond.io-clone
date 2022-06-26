import {Component, EventEmitter, OnInit} from '@angular/core';
import {GridCommand} from "../../../../lib/grid";

@Component({
  selector: 'app-workspace-setting-contact-fields',
  templateUrl: './workspace-setting-contact-fields.component.html',
  styleUrls: ['./workspace-setting-contact-fields.component.scss']
})
export class WorkspaceSettingContactFieldsComponent implements OnInit {
  commander = new EventEmitter<GridCommand<any>>();

  constructor() { }

  ngOnInit(): void {
  }

}
