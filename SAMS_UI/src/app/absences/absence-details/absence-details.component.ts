import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyAbsenceDTO } from '../absence.model';
import { AbsenceService } from '../absence.service';

@Component({
  selector: 'app-absence-details',
  templateUrl: './absence-details.component.html',
  styleUrls: ['./absence-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe] 
})
export class AbsenceDetailsComponent implements OnInit {

  constructor(private absenceService: AbsenceService,
              public datePipe: DatePipe,
              public dialogRef: MatDialogRef<AbsenceDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CompanyAbsenceDTO) { }

  formData: FormGroup;

  ngOnInit(): void {
    this.formData = new FormGroup({
      id: new FormControl(this.data.id),
      employeeName: new FormControl(this.data.employeeName),
      employeeMaximumAnnualLeave: new FormControl(this.data.employeeMaximumAnnualLeave),
      employeeRemainingAnuualLeave: new FormControl(this.data.employeeRemainingAnuualLeave),
      absenceType: new FormControl(this.absenceService.getAbsenceTypeName(this.data.absenceType)),
      startDate: new FormControl(this.datePipe.transform(this.data.startDate, "dd-MMM-yyyy")),
      endDate: new FormControl(this.datePipe.transform(this.data.endDate, "dd-MMM-yyyy")),
      durationInDays: new FormControl(this.data.durationInDays),
      description: new FormControl(this.data.description),
      absenceStatus: new FormControl(this.absenceService.getAbsenceStatusName(this.data.absenceStatus))
    })
  }

  close() {
    this.dialogRef.close();
  }

}

