import {Component, OnInit} from '@angular/core';
import {IdentityService} from "../../../services/account/identity.service";
import {OperationResultStatus} from "../../../lib/operation-result";
import {Router} from "@angular/router";
import {NotificationService} from "../../../services/core/notification.service";
import {StringHelpers} from "../../../lib/helpers/string.helpers";
import {ValidationHelpers} from "../../../lib/helpers/validation.helpers";

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
    this.validations.password = '';
    const password = this.forms.password.trim();

    if (!password) {
      this.validations.password = 'PASSWORD_REQUIRED';
    } else if (password.length < 6) {
      this.validations.password = 'PASSWORD_MIN_LENGTH';
    }

    return this.validations.password === '';
  }

  validateEmail(): boolean {
    this.validations.email = '';
    const email = this.forms.email.trim();

    if (!email) {
      this.validations.email = 'EMAIL_REQUIRED';
    } else if (!ValidationHelpers.isEmail(email)) {
      this.validations.email = 'EMAIL_INVALID';
    }

    return this.validations.email === '';
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
