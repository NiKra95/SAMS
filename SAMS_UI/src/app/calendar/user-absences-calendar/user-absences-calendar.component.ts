import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import { AbsenceType, ApprovedUserAbsenceDTO } from 'src/app/absences/absence.model';
import { SecurityService } from 'src/app/security/security.service';
import { formatDateFormData } from 'src/app/utilites/utils';
import { CalendarService } from '../calendar.service';

@Component({
  selector: 'app-user-absences-calendar',
  templateUrl: './user-absences-calendar.component.html',
  styleUrls: ['./user-absences-calendar.component.scss']
})
export class UserAbsencesCalendarComponent implements OnInit {

  events: any[] = [];

  calendarOptions: CalendarOptions = {
    aspectRatio: 2.35,
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    editable: false,
    selectable: false
  };

  constructor(private calendarService: CalendarService,
              private securityService: SecurityService) { }

  ngOnInit(): void {
    this.getUserApprovedAbsences();
  }

  getUserApprovedAbsences() {
    let userId = this.securityService.getUserID();
    this.calendarService.getApprovedUserAbsences(userId).subscribe((response: ApprovedUserAbsenceDTO[]) => {

      response.forEach(element => {
        this.events.push({
          title: AbsenceType[element.absenceType], 
          start: formatDateFormData(element.startDate), 
          end: formatDateFormData(element.endDate),
          color: this.calendarService.getColorForAbsenceType(element.absenceType)
        }) 
      });

      this.calendarOptions.events = this.events;
    });
  }

}
