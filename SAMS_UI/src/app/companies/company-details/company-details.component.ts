import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyDTO } from '../company.model';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe] 
})
export class CompanyDetailsComponent implements OnInit {

  constructor(public datePipe: DatePipe,
              public dialogRef: MatDialogRef<CompanyDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CompanyDTO) { }

  formData: FormGroup;
  logoPath: string;

  ngOnInit(): void {
    this.formData = new FormGroup({
      id: new FormControl(this.data.id),
      name: new FormControl(this.data.name),
      address: new FormControl(this.data.address),
      country: new FormControl(this.data.country),
      website: new FormControl(this.data.website),
      creationDate: new FormControl(this.datePipe.transform(this.data.creationDate, "dd-MMM-yyyy")),
      logo: new FormControl(this.data.logo),
      numberOfEmployees: new FormControl(this.data.numberOfEmployees),
      numberOfAdmins: new FormControl(this.data.numberOfAdmins)
    });

    this.logoPath = this.data.logo;
  }

  close() {
    this.dialogRef.close();
  }

}
