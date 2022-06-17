import { Component } from '@angular/core';
import {IdentityService} from "./services/account/identity.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    readonly identityService: IdentityService
  ) {
  }
}
