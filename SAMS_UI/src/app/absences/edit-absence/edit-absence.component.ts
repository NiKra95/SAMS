import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SecurityService } from 'src/app/security/security.service';
import { AbsenceCreationDTO, AbsenceDTO, AbsenceStatus, AbsenceType } from '../absence.model';
import { AbsenceService } from '../absence.service';

@Component({
  selector: 'app-edit-absence',
  templateUrl: './edit-absence.component.html',
  styleUrls: ['./edit-absence.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe] 
})
export class EditAbsenceComponent implements OnInit {

  model: AbsenceCreationDTO;
  form: FormGroup;
  currentDate = new Date();
  absenceTypes = Object.keys(AbsenceType).filter((x) => !Number.isNaN(Number(x))).map(key => AbsenceType[key]);
  selectedAbsenceType: AbsenceType = this.absenceTypes[0];
  maxChars = 140;
  
  constructor(private securityService: SecurityService,
              private absenceService: AbsenceService,
              public datePipe: DatePipe,
              public dialogRef: MatDialogRef<EditAbsenceComponent>,
              @Inject(MAT_DIALOG_DATA) public data: AbsenceDTO) {} 

  ngOnInit(): void {
    this.form = new FormGroup({
      absenceType: new FormControl(this.data.absenceType, Validators.required),
      description: new FormControl(this.data.description),
      startDate: new FormControl(this.data.startDate, Validators.required),
      endDate: new FormControl(this.data.endDate, Validators.required),
      absenceStatus: new FormControl(AbsenceStatus.Pending, Validators.required)
    });
    
    this.currentDate = new Date(
      this.currentDate.setDate(this.currentDate.getDate())
    );

    !this.weekendsDatesFilter(this.currentDate) && this.weekendsHandler();
  }

  saveChanges() {
    this.model = this.form.value;
    this.model.employeeId = this.securityService.getUserID();
    this.model.durationInDays = this.getWorkingDayCount(this.model.startDate, this.model.endDate);
    this.absenceService.edit(this.data.id, this.model).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  close() {
    this.dialogRef.close(false);
  }

  weekendsDatesFilter(d: Date): boolean {
    const day = d.getDay();
    return day !== 0 && day !== 6;
  }

  weekendsHandler() {
    this.currentDate = new Date(
      this.currentDate.setDate(this.currentDate.getDate())
    );
    !this.weekendsDatesFilter(this.currentDate) && this.weekendsHandler();
  }

  getWorkingDayCount(startDate, endDate)
  {
    let count = 0;
    const curDate = new Date(startDate.getTime());
    while (curDate <= endDate) {
        const dayOfWeek = curDate.getDay();
        if(dayOfWeek !== 0 && dayOfWeek !== 6) count++;
        curDate.setDate(curDate.getDate() + 1);
    }
    return count;
  }

}
