import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GenderType, UserDetailsDTO } from '../../users.model';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-edit-user-details',
  templateUrl: './edit-user-details.component.html',
  styleUrls: ['./edit-user-details.component.scss']
})
export class EditUserDetailsComponent implements OnInit {

  formData: FormGroup;
  picturePath: string;
  genders = Object.keys(GenderType).filter((x) => !Number.isNaN(Number(x))).map(key => GenderType[key]);
  selectedGender: GenderType;
  
  constructor(private usersService: UsersService,
    public dialogRef: MatDialogRef<EditUserDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDetailsDTO) { }

    ngOnInit(): void {
      this.formData = new FormGroup({
        firstName: new FormControl(this.data.firstName, Validators.required),
        lastName: new FormControl(this.data.lastName, Validators.required),
        email: new FormControl(this.data.email),
        address: new FormControl(this.data.address),
        gender: new FormControl(this.data.gender),
        dateOfBirth: new FormControl(this.data.dateOfBirth),
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
