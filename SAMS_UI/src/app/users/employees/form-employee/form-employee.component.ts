import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeCreationDTO, GenderType } from '../../users.model';

@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styleUrls: ['./form-employee.component.scss']
})
export class FormEmployeeComponent implements OnInit {

  constructor() { }

  form: FormGroup;
  public showPassword: boolean = false;
  genders = Object.keys(GenderType).filter((x) => !Number.isNaN(Number(x))).map(key => GenderType[key]);
  selectedGender: GenderType = this.genders[0];

  @Input()
  model: EmployeeCreationDTO;

  @Output()
  onSaveChanges = new EventEmitter<EmployeeCreationDTO>();

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      // address: new FormControl('No Address'),
      password: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      designation: new FormControl('', Validators.required),
      startWorkingDate: new FormControl('', Validators.required),
      maximumAnnualLeave: new FormControl(20, Validators.required),

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

    if(field.hasError('required')) {
      return "The email field is required";
    }

    if(field.hasError('email')) {
      return "The email is invalid";
    }

    return '';
  }

}
