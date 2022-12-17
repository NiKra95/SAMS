import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApplicationAdminDTO } from '../../users.model';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-app-admin-details',
  templateUrl: './app-admin-details.component.html',
  styleUrls: ['./app-admin-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe]
})
export class AppAdminDetailsComponent implements OnInit {

  constructor(public usersService: UsersService,
              public datePipe: DatePipe,
              public dialogRef: MatDialogRef<AppAdminDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ApplicationAdminDTO) { }

  formData: FormGroup;
  picturePath: string;

  ngOnInit(): void {

    this.formData = new FormGroup({
      firstName: new FormControl(this.data.firstName),
      lastName: new FormControl(this.data.lastName),
      email: new FormControl(this.data.email),
      address: new FormControl(this.data.address == null ? "No Address": this.data.address),
      gender: new FormControl(this.data.gender),
      dateOfBirth: new FormControl(this.datePipe.transform(this.data.dateofBirth, "dd-MMM-yyyy")),
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
