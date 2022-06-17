import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  waiting: boolean = false;
  forms: { email: string } = {email: ''};
  validations: { email: string } = {email: ''};

  constructor() { }

  ngOnInit(): void {

  }

}
