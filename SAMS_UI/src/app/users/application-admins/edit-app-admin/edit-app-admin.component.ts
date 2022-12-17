import { DatePipe } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, Inject, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApplicationAdminCreationDTO, ApplicationAdminDTO, GenderType } from '../../users.model';
import { UsersService } from '../../users.service';
import { CreateAppAdminsComponent } from '../create-app-admins/create-app-admins.component';

@Component({
  selector: 'app-edit-app-admin',
  templateUrl: './edit-app-admin.component.html',
  styleUrls: ['./edit-app-admin.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe]
})
export class EditAppAdminComponent implements OnInit {

  creationModel: ApplicationAdminCreationDTO;
  formData: FormGroup;
  picturePath: string;
  genders = Object.keys(GenderType).filter((x) => !Number.isNaN(Number(x))).map(key => GenderType[key]);
  selectedGender: GenderType;

  constructor(private usersService: UsersService,
    public dialogRef: MatDialogRef<EditAppAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ApplicationAdminDTO) {}

    ngOnInit(): void {

      this.formData = new FormGroup({
        firstName: new FormControl(this.data.firstName, Validators.required),
        lastName: new FormControl(this.data.lastName, Validators.required),
        email: new FormControl(this.data.email),
        address: new FormControl(this.data.address),
        gender: new FormControl(this.data.gender),
        dateOfBirth: new FormControl(this.data.dateofBirth),
        picture: new FormControl(this.data.picture)
      });

      this.selectedGender = Object.values(GenderType).indexOf(this.data.gender);

      if(this.data.picture != null) {
        this.picturePath = this.data.picture;
      }
      else {
        this.picturePath = this.usersService.getDefaultUserPicture(this.data.gender.toString());
      }
    }

    onImageSelected(image){
      this.formData.get('picture').setValue(image);
    }

    saveChanges() {
      this.usersService.editUserDetails(this.data.id, this.formData.value).subscribe(() => {
        this.dialogRef.close(true);
      });
    }

    close() {
      this.dialogRef.close(false);
    }
}
