import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmployeeHomePageDTO } from './home.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) {  }

  private apiURL = environment.apiURL + "/home";

  getEmployeeHomePageData(userId: string): Observable<EmployeeHomePageDTO> {
    return this.http.get<EmployeeHomePageDTO>(`${this.apiURL}/getEmployeeHomePageData/${userId}`);
  }
}
