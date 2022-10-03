import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginRequest} from '../security.model';

@Component({
  selector: 'app-authentication-form',
  templateUrl: './authentication-form.component.html',
  styleUrls: ['./authentication-form.component.scss']
})
export class AuthenticationFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  form!: FormGroup;
  public showPassword: boolean = false;

  @Input()
  action: string = "Register";

  @Output()
  onSubmit = new EventEmitter<LoginRequest>();

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', {
        validators: [Validators.required, Validators.email]
      }],
      password: ['', {
        validators: [Validators.required]
      }]
    });
  } 

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  getEmailErrorMessage() {
    var field = this.form.get('email');

    if(field.hasError('required')){
      return "The email field is required";
    }

    if(field.hasError('email')){
      return "The email is invalid";
    }

    return '';
  }

}
