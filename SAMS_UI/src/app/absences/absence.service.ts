import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatDateFormData } from '../utilites/utils';
import { AbsenceCreationDTO, AbsenceDTO } from './absence.model';

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

  create(absenceCreationDTO: AbsenceCreationDTO):Observable<number> {
    const formData: FormData = this.BuildFormData(absenceCreationDTO);
    console.log(Array.from(formData));
    return this.http.post<number>(this.apiURL, formData);
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

}
