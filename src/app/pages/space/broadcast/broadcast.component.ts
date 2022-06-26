import {Component, EventEmitter, OnInit} from '@angular/core';
import {GridCommand} from "../../../lib/grid";

@Component({
  selector: 'app-broadcast',
  templateUrl: './broadcast.component.html',
  styleUrls: ['./broadcast.component.scss']
})
export class BroadcastComponent implements OnInit {
  showSearch: boolean = false;
  commander = new EventEmitter<GridCommand<any>>();
  constructor() { }

  ngOnInit(): void {
  }

}
