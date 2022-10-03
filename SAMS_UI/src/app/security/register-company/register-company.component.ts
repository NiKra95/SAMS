import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Gender, LoginRequest } from '../security.model';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.scss']
})
export class RegisterCompanyComponent implements OnInit {

  constructor(private securityService: SecurityService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  errors: string[] = [];

  genders: Gender[] = [
    {value: '0', viewValue: 'Unknown'},
    {value: '1', viewValue: 'Male'},
    {value: '2', viewValue: 'Female'},
  ];

  form!: FormGroup;
  public showPassword: boolean = false;

  @Input()
  action: string = "Registration";


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      //CompanyAdmin Info
      firstName: ['', {
        validators: [Validators.required, Validators.email]
      }],
      email: ['', {
        validators: [Validators.required]
      }],
      lastName: ['', {
        validators: [Validators.required]
      }],
      password: ['', {
        validators: [Validators.required]
      }],
      gender: ['', {
        validators: [Validators.required]
      }],
      dateOfBirth: '',

      //Company Info
      companyName: ['', {
        validators: [Validators.required]
      }],
      companyAddress: ['', {
        validators: [Validators.required]
      }]
    });
  }

  onImageSelected(image){
    this.form.get('picture').setValue(image);
  }

  register(userCredentials: LoginRequest)  {
    this.errors = [];
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
