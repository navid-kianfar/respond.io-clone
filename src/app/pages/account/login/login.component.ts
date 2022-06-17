import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  togglePasswordVisibility($event: MouseEvent, element: HTMLInputElement) {
    element.type = element.type === 'text' ? 'password' : 'text';
  }
}
