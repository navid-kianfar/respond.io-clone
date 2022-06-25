import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workspace-setting-closing-notes',
  templateUrl: './workspace-setting-closing-notes.component.html',
  styleUrls: ['./workspace-setting-closing-notes.component.scss']
})
export class WorkspaceSettingClosingNotesComponent implements OnInit {
  notesOptions: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.notesOptions = [
      { text: 'Closing Notes Dialog is optional & Summary is optional', value: 1},
      { text: 'Closing Notes Dialog is mandatory & Summary is optional', value: 2},
      { text: 'Closing Notes Dialog is mandatory & Summary is mandatory', value: 3},
      { text: 'Closing Notes Dialog is disabled', value: 4},
    ];
  }

}
