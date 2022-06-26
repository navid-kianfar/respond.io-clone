import {Component, EventEmitter, OnInit} from '@angular/core';
import {GridCommand} from "../../../../lib/grid";

@Component({
  selector: 'app-workspace-setting-snippets',
  templateUrl: './workspace-setting-snippets.component.html',
  styleUrls: ['./workspace-setting-snippets.component.scss']
})
export class WorkspaceSettingSnippetsComponent implements OnInit {
  commander = new EventEmitter<GridCommand<any>>();

  constructor() { }

  ngOnInit(): void {
  }

}
