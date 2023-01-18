import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApplicationDashboardDTO, CompanyDashboardDTO } from './dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {  }

  private apiURL = environment.apiURL + "/dashboard";

  getCompanyDashboardData(companyId: number): Observable<CompanyDashboardDTO> {
    return this.http.get<CompanyDashboardDTO>(`${this.apiURL}/getCompanyDashboardData/${companyId}`);
  }

  getApplicationDashboardData(): Observable<ApplicationDashboardDTO> {
    return this.http.get<ApplicationDashboardDTO>(`${this.apiURL}/getApplicationDashboardData`);
  }
}
