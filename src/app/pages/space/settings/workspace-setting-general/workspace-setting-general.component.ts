import { Component, OnInit } from '@angular/core';
import {TimezonesService} from "../../../../services/core/timezones.service";

@Component({
  selector: 'app-workspace-setting-general',
  templateUrl: './workspace-setting-general.component.html',
  styleUrls: ['./workspace-setting-general.component.scss']
})
export class WorkspaceSettingGeneralComponent implements OnInit {
  constructor(readonly timezoneService: TimezonesService) { }

  ngOnInit(): void {
  }

}
