import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatDateFormData } from '../utilites/utils';
import { AbsenceCreationDTO, AbsenceDTO, AbsenceStatus, AbsenceType } from './absence.model';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + "/absences";

  getUserAbsences(page: number, recordsPerPage: number, userId: string): Observable<any>{
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('recordsPerPage', recordsPerPage.toString());
    return this.http.get<AbsenceDTO[]>(`${this.apiURL}/getUserAbsences/${userId}`, {observe: 'response', params});
  }

  getCompanyAbsences(page: number, recordsPerPage: number, companyId: number): Observable<any>{
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('recordsPerPage', recordsPerPage.toString());
    return this.http.get<AbsenceDTO[]>(`${this.apiURL}/getCompanyAbsences/${companyId}`, {observe: 'response', params});
  }

  create(absenceCreationDTO: AbsenceCreationDTO):Observable<number> {
    const formData: FormData = this.BuildFormData(absenceCreationDTO);
    return this.http.post<number>(this.apiURL, formData);
  }

  edit(absenceId: number, absenceCreationDTO: AbsenceCreationDTO):Observable<number> {
    const formData: FormData = this.BuildFormData(absenceCreationDTO);
    return this.http.put<number>(`${this.apiURL}/editAbsence/${absenceId}`, formData);
  }

  delete(absenceId: number) {
    return this.http.delete(`${this.apiURL}/deleteAbsence/${absenceId}`);
  }

  approveAbsenceRequest(absenceId: number):Observable<any> {
    return this.http.put(`${this.apiURL}/approveAbsenceRequest/${absenceId}`, new FormData());
  }

  denyAbsenceRequest(absenceId: number):Observable<any> {
    return this.http.put(`${this.apiURL}/denyAbsenceRequest/${absenceId}`, new FormData());
  }

  private BuildFormData(absence: AbsenceCreationDTO): FormData {
    const formData = new FormData();

    formData.append('employeeId', absence.employeeId);
    formData.append('absenceType', absence.absenceType);
    formData.append('startDate', formatDateFormData(absence.startDate));
    formData.append('endDate', formatDateFormData(absence.endDate));
    formData.append('durationInDays', absence.durationInDays.toString());
    formData.append('description', absence.description);
    formData.append('absenceStatus', absence.absenceStatus);

    return formData;
  }

  getAbsenceTypeName(enumValue) {
    return AbsenceType[enumValue];
  }

  getAbsenceStatusName(enumValue) {
    return AbsenceStatus[enumValue];
  }

  absenceStatusStyle(absenceStatus) {
    let absenceStatusStyle;
    switch(absenceStatus) {
      case AbsenceStatus.Pending: 
        absenceStatusStyle ='pending-style';
        break;
      case AbsenceStatus.Approved:
        absenceStatusStyle = 'approved-style';
        break;
      case AbsenceStatus.Denied:
        absenceStatusStyle = 'denied-style';
        break;
    }
  
    return absenceStatusStyle;
  }

}
