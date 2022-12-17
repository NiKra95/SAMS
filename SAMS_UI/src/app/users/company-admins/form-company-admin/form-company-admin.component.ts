import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyAdminCreationDTO, GenderType } from '../../users.model';

@Component({
  selector: 'app-form-company-admin',
  templateUrl: './form-company-admin.component.html',
  styleUrls: ['./form-company-admin.component.scss']
})
export class FormCompanyAdminComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  form: FormGroup;
  public showPassword: boolean = false;
  genders = Object.keys(GenderType).filter((x) => !Number.isNaN(Number(x))).map(key => GenderType[key]);
  selectedGender: GenderType = this.genders[0];

  @Input()
  model: CompanyAdminCreationDTO;

  @Output()
  onSaveChanges = new EventEmitter<CompanyAdminCreationDTO>();

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('No Address'),
      password: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required)
    });
  }
  
  saveChanges(){
    this.onSaveChanges.emit(this.form.value);
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
