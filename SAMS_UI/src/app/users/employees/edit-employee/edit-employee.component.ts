import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { EmployeeDTO, EmployeeEditDTO, GenderType } from '../../users.model';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe] 
})
export class EditEmployeeComponent implements OnInit {

  formData: FormGroup;
  fullName: string;
  email: string;

  constructor(private usersService: UsersService,
              public datePipe: DatePipe,
              public dialogRef: MatDialogRef<EditEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EmployeeDTO) { }

  ngOnInit(): void {
    this.formData = new FormGroup({
      startWorkingDate: new FormControl(this.datePipe.transform(this.data.startWorkingDate, "dd-MMM-yyyy")),
      designation: new FormControl(this.data.designation, Validators.required),
      experienceInCompany: new FormControl(this.data.experienceInCompany, Validators.required),
      maximumAnnualLeave: new FormControl(this.data.maximumAnnualLeave, Validators.required),
    });

    this.fullName = this.data.firstName + " " + this.data.lastName;
    this.email = this.data.email;
  }

  saveChanges() {
    this.usersService.editEmployeeSettings(this.data.id, this.formData.value).subscribe(() => {
      Swal.fire('Success', 'Employee data has changed.', 'success').then(() => {
        this.dialogRef.close(true);
      });
    });
    
  }

  close() {
    this.dialogRef.close(false);
  }
}
