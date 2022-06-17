import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  waiting: boolean = false;
  forms: { email: string } = {email: ''};
  validations: { email: string } = {email: ''};

  constructor() { }

  ngOnInit(): void {

  }

}
