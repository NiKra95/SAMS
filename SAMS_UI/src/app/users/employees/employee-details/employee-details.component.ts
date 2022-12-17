import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeDTO } from '../../users.model';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe] 
})
export class EmployeeDetailsComponent implements OnInit {

  constructor(private usersService: UsersService,
              public datePipe: DatePipe,
              public dialogRef: MatDialogRef<EmployeeDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: EmployeeDTO) { }

  formData: FormGroup;
  picturePath: string;

  ngOnInit(): void {
    this.formData = new FormGroup({
      firstName: new FormControl(this.data.firstName),
      lastName: new FormControl(this.data.lastName),
      email: new FormControl(this.data.email),
      gender: new FormControl(this.data.gender),
      dateOfBirth: new FormControl(this.datePipe.transform(this.data.dateofBirth, "dd-MMM-yyyy")),
      startWorkingDate: new FormControl(this.datePipe.transform(this.data.startWorkingDate, "dd-MMM-yyyy")),
      designation: new FormControl(this.data.designation),
      experienceInCompany: new FormControl(this.data.experienceInCompany),
      maximumAnnualLeave: new FormControl(this.data.maximumAnnualLeave),
      picture: new FormControl(this.data.picture)
    });

    if(this.data.picture != null) {
      this.picturePath = this.data.picture;
    }
    else {
      this.picturePath = this.usersService.getDefaultUserPicture(this.data.gender.toString());
    }
  }

  close() {
    this.dialogRef.close();
  }

}
