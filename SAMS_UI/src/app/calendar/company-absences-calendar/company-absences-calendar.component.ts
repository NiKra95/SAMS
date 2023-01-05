import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { AbsenceType, ApprovedAbsencesInCompanyDTO } from 'src/app/absences/absence.model';
import { SecurityService } from 'src/app/security/security.service';
import { formatDateFormData } from 'src/app/utilites/utils';
import { CalendarService } from '../calendar.service';


@Component({
  selector: 'app-company-absences-calendar',
  templateUrl: './company-absences-calendar.component.html',
  styleUrls: ['./company-absences-calendar.component.scss']
})
export class CompanyAbsencesCalendarComponent implements OnInit {

  events: any[] = [];

  calendarOptions: CalendarOptions = {
    aspectRatio: 2.3,
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    editable: false,
    selectable: false
  };
  
  constructor(private calendarService: CalendarService,
              private securityService: SecurityService) { }

  ngOnInit(): void {
    this.getApprovedAbsencesInCompany();
  }

  getApprovedAbsencesInCompany() {
    let companyId = parseInt(this.securityService.getCompanyID());
    this.calendarService.getApprovedAbsencesInCompany(companyId).subscribe((response: ApprovedAbsencesInCompanyDTO[]) => {

      response.forEach(element => {
        this.events.push({
          title: `${element.employeeFullName} - (${AbsenceType[element.absenceType]})`, 
          start: formatDateFormData(element.startDate), 
          end: formatDateFormData(element.endDate),
          color: this.calendarService.getColorForAbsenceType(element.absenceType)
        }) 
      });
      
      this.calendarOptions.events = this.events;
    });
  }

}
