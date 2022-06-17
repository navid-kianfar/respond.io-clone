import {Component, OnInit} from '@angular/core';
import {IdentityService} from "../../../services/account/identity.service";
import {OperationResultStatus} from "../../../lib/operation-result";
import {Router} from "@angular/router";
import {NotificationService} from "../../../services/core/notification.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  waiting: boolean = false;
  forms: { email: string; password: string; } = {email: '', password: ''};
  validations: { email: string; password: string; } = {email: '', password: ''};

  constructor(
    private readonly identityService: IdentityService,
    private readonly router: Router,
    private readonly notificationService: NotificationService,
  ) { }

  ngOnInit(): void {

  }

  updatePassword(input: string) {
    this.forms.password = input;
    this.validatePassword();
  }

  updateEmail(input: string) {
    this.forms.email = input;
    this.validateEmail();
  }

  validatePassword(): boolean {
    return true;
  }

  validateEmail(): boolean {
    return true;
  }

  togglePasswordVisibility($event: MouseEvent, element: HTMLInputElement) {
    element.type = element.type === 'text' ? 'password' : 'text';
  }

  async signin() {
    const isValid = this.validateEmail() && this.validatePassword();
    if (!isValid) { return; }
    this.waiting = true;
    const op = await this.identityService.signin(this.forms);
    if (op.status === OperationResultStatus.success) {
      await this.identityService.load();
      await this.router.navigateByUrl('/account/profile');
      return;
    }

    this.waiting = false;
    this.notificationService.error(op.message || '');
  }
}
