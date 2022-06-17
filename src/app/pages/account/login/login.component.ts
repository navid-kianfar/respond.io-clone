import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  waiting: boolean = false;
  forms: { email: string; password: string; } = {email: '', password: ''};
  validations: { email: string; password: string; } = {email: '', password: ''};

  constructor() { }

  ngOnInit(): void {

  }

  togglePasswordVisibility($event: MouseEvent, element: HTMLInputElement) {
    element.type = element.type === 'text' ? 'password' : 'text';
  }
}
