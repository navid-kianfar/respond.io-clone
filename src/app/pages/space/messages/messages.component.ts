import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  showSidebar: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebar($event: MouseEvent) {
    this.showSidebar = !this.showSidebar;
  }
}
