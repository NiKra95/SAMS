import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/security/security.service';
import { AbsenceCreationDTO, AbsenceStatus, AbsenceType } from '../absence.model';
import { AbsenceService } from '../absence.service';

@Component({
  selector: 'app-create-absence',
  templateUrl: './create-absence.component.html',
  styleUrls: ['./create-absence.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe] 
})
export class CreateAbsenceComponent implements OnInit {

  // constructor(private securityService: SecurityService,
  //             private absenceService: AbsenceService,
  //             private router: Router) { }

  // ngOnInit(): void {
  // }

  // saveChanges(absenceCreationDTO: AbsenceCreationDTO){
  //   absenceCreationDTO.employeeId = this.securityService.getUserID();
  //   this.absenceService.create(absenceCreationDTO).subscribe(() => {
  //     this.router.navigate(['/employees']);
  //   });
  // }

  model: AbsenceCreationDTO;
  form: FormGroup;
  currentDate = new Date();
  absenceTypes = Object.keys(AbsenceType).filter((x) => !Number.isNaN(Number(x))).map(key => AbsenceType[key]);
  selectedAbsenceType: AbsenceType = this.absenceTypes[0];
  
  constructor(private securityService: SecurityService,
              private absenceService: AbsenceService,
              public dialogRef: MatDialogRef<CreateAbsenceComponent>) {} 

  ngOnInit(): void {
    this.form = new FormGroup({
      absenceType: new FormControl('', Validators.required),
      description: new FormControl('No Description'),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
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
    this.absenceService.create(this.model).subscribe(() => {
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
    console.log(count);
    return count;
  }

}
