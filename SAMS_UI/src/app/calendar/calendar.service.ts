import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AbsenceType, ApprovedAbsencesInCompanyDTO, ApprovedUserAbsenceDTO } from '../absences/absence.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + "/calendar";

  getApprovedUserAbsences(userId: string): Observable<any>{
    return this.http.get<ApprovedUserAbsenceDTO[]>(`${this.apiURL}/getApprovedUserAbsences/${userId}`);
  }

  getApprovedAbsencesInCompany(companyId: number): Observable<any>{
    return this.http.get<ApprovedAbsencesInCompanyDTO[]>(`${this.apiURL}/getApprovedAbsencesInCompany/${companyId}`);
  }


  getColorForAbsenceType(enumValue) {
    let color;
    switch(enumValue) {
      case AbsenceType['Annual Leave']: {
        color = 'blue';
        break;
      }
      case AbsenceType['Religious Holidays']: {
        color = 'orange';
        break;
      }
      case AbsenceType['Sick Leave']: {
        color = 'green';
        break;
      }
      case AbsenceType['Special Leave']: {
        color = 'purple';
        break;
      }
      case AbsenceType['Unpaid Leave']: {
        color = 'red';
        break;
      }
    }

    return color;
  }
}
