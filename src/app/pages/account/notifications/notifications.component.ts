import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  emailOptions: any[] = [];
  mobileOptions: any[] = [];
  desktopOptions: any[] = [];
  soundOptions: any[] = [];

  constructor() { }

  ngOnInit(): void {

    this.fillData();
  }

  private fillData() {
    this.emailOptions = [
      { text: 'Send me notification for the contacts assigned to me and mentions', value: 2 },
      { text: 'Send me notification for mentions only', value: 3 },
      { text: 'Do not send me desktop notifications', value: 4 },
    ];
    this.mobileOptions = [
      { text: 'Send me notifications for all contacts and mentions', value: 1 },
      { text: 'Send me notification for the contacts assigned to me and mentions', value: 2 },
      { text: 'Send me notification for mentions only', value: 3 },
      { text: 'Do not send me desktop notifications', value: 4 },
    ];
    this.desktopOptions = [
      { text: 'Send me notifications for all contacts and mentions', value: 1 },
      { text: 'Send me notification for the contacts assigned to me and mentions', value: 2 },
      { text: 'Send me notification for mentions only', value: 3 },
      { text: 'Do not send me desktop notifications', value: 4 },
    ];
    this.soundOptions = [
      { text: 'Play sound notifications for contacts assigned to me or unassigned contacts', value: 1 },
      { text: 'Play sound notifications for contacts assigned to me only', value: 2 },
      { text: 'Do not play sound notifications', value: 3 },
    ];
  }
}
