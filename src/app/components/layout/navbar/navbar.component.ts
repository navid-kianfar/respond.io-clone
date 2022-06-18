import { Component, OnInit } from '@angular/core';
import {AppStateService} from "../../../services/core/app-state.service";
import {IdentityService} from "../../../services/account/identity.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    readonly appState: AppStateService,
    readonly identityService: IdentityService
  ) { }

  ngOnInit(): void {
    this.appState.navigation.menus = [
      { url: '/space/92086/dashboard', icon: 'rox-icon-pie-chart' },
      { url: '/space/92086/message/all', icon: 'rox-icon-message-square' },
      { url: '/space/92086/contact', icon: 'rox-icon-users' },
      { url: '/space/92086/broadcast', icon: 'rox-icon-radio' },
      { url: '/space/92086/workflows', icon: 'rox-icon-command' },
      { url: '/space/92086/reports', icon: 'rox-icon-bar-chart-2' },
      { url: '/account/profile', icon: 'rox-icon-settings' }
    ];
  }

  async logout() {
    await this.identityService.logout();
    setTimeout(() => window.location.href = '/account/login', 300);
  }
}
