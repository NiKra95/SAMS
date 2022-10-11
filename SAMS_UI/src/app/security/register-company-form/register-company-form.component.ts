import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyCreationDTO } from 'src/app/companies/company.model';
import { Gender } from 'src/app/users/users.model';
import {  CompanyAdminCreationDTO, RegistrationRequest } from '../registration.model';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-register-company-form',
  templateUrl: './register-company-form.component.html',
  styleUrls: ['./register-company-form.component.scss']
})
export class RegisterCompanyFormComponent implements OnInit {

  constructor(private securityService: SecurityService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  errors: string[] = [];

  genders: Gender[] = [
    {value: '0', viewValue: 'Unknown'},
    {value: '1', viewValue: 'Male'},
    {value: '2', viewValue: 'Female'},
  ];

  form: FormGroup;

  public showPassword: boolean = false;


  @Input()
  action: string = "Registration";
  companyAdmin: CompanyAdminCreationDTO;
  company: CompanyCreationDTO;

  @Output()
  onSubmit = new EventEmitter<RegistrationRequest>();


  ngOnInit(): void {
    this.form = new FormGroup({
        //CompanyAdmin Info
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
        gender: new FormControl('', Validators.required),
        dateOfBirth: new FormControl('', Validators.required),

        //Company Info
        companyName: new FormControl('', Validators.required),
        companyAddress: new FormControl('', Validators.required),
        companyCountry: new FormControl('', Validators.required),
        companyWebsite: new FormControl(),
        logo: new FormControl()

        // admin: new FormGroup({
        //   firstName: new FormControl('', Validators.required),
        //   lastName: new FormControl('', Validators.required),
        //   email: new FormControl('', [Validators.required, Validators.email]),
        //   password: new FormControl('', Validators.required),
        //   gender: new FormControl('', Validators.required),
        //   dateOfBirth: new FormControl('', Validators.required)
        // }),
        // comp: new FormGroup({
        //   companyName: new FormControl('', Validators.required),
        //   companyAddress: new FormControl('', Validators.required),
        //   companyCountry: new FormControl('', Validators.required),
        //   companyWebsite: new FormControl(),
        //   logo: new FormControl()
        // })
    })
  }

  onImageSelected(image){
    this.form.get('logo').setValue(image);
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
