import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AbsenceCreationDTO, AbsenceStatus, AbsenceType } from '../absence.model';

@Component({
  selector: 'app-form-absence',
  templateUrl: './form-absence.component.html',
  styleUrls: ['./form-absence.component.scss']
})
export class FormAbsenceComponent implements OnInit {
  
  constructor() { }
  
  form: FormGroup;
  currentDate = new Date();
  absenceTypes = Object.keys(AbsenceType).filter((x) => !Number.isNaN(Number(x))).map(key => AbsenceType[key]);
  selectedAbsenceType: AbsenceType = this.absenceTypes[0];

  @Output()
  onSaveChanges = new EventEmitter<AbsenceCreationDTO>();

  ngOnInit(): void {
    this.form = new FormGroup({
      absenceType: new FormControl('', Validators.required),
      description: new FormControl(''),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      // durationInDays: new FormControl('', Validators.required),
      absenceStatus: new FormControl(AbsenceStatus.Pending, Validators.required)
    });
    
    this.currentDate = new Date(
      this.currentDate.setDate(this.currentDate.getDate())
    );
  }

  weekendsDatesFilter(d: Date): boolean {
    const day = d.getDay();
    return day !== 0 && day !== 6;
  }

  weekendsHandler() {
    this.currentDate = new Date(
      this.currentDate.setDate(this.currentDate.getDate() + 2)
    );
    !this.weekendsDatesFilter(this.currentDate) && this.weekendsHandler();
  }

  saveChanges(){
    this.onSaveChanges.emit(this.form.value);
  }

}
