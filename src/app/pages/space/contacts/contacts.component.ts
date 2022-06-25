import {Component, EventEmitter, OnInit} from '@angular/core';
import {GridCommand} from "../../../lib/grid";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  showSearch: boolean = false;
  commander = new EventEmitter<GridCommand<any>>();
  constructor() { }

  ngOnInit(): void {
  }

}
