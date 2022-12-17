import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyAdminCreationDTO, CompanyAdminDTO, GenderType } from '../../users.model';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-edit-company-admin',
  templateUrl: './edit-company-admin.component.html',
  styleUrls: ['./edit-company-admin.component.scss']
})
export class EditCompanyAdminComponent implements OnInit {

  creationModel: CompanyAdminCreationDTO;
  formData: FormGroup;
  picturePath: string;
  genders = Object.keys(GenderType).filter((x) => !Number.isNaN(Number(x))).map(key => GenderType[key]);
  selectedGender: GenderType;

  constructor(private usersService: UsersService,
    public dialogRef: MatDialogRef<EditCompanyAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CompanyAdminDTO) { }

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
