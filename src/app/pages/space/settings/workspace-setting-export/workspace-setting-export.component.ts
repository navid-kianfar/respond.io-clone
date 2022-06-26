import {Component, EventEmitter, OnInit} from '@angular/core';
import {GridCommand} from "../../../../lib/grid";

@Component({
  selector: 'app-workspace-setting-export',
  templateUrl: './workspace-setting-export.component.html',
  styleUrls: ['./workspace-setting-export.component.scss']
})
export class WorkspaceSettingExportComponent implements OnInit {
  commander = new EventEmitter<GridCommand<any>>();
  constructor() { }

  ngOnInit(): void {
  }

}
