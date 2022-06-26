import {Component, EventEmitter, OnInit} from '@angular/core';
import {GridCommand} from "../../../lib/grid";

@Component({
  selector: 'app-workflows',
  templateUrl: './workflows.component.html',
  styleUrls: ['./workflows.component.scss']
})
export class WorkflowsComponent implements OnInit {
  showSearch: boolean = false;
  commander = new EventEmitter<GridCommand<any>>();
  constructor() { }

  ngOnInit(): void {
  }

}
