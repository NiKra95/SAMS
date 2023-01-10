import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CompanyCreationDTO, CompanyDTO, CompanySettingsDTO } from './company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + "/companies";
  pipe = new DatePipe('en');

  get(page: number, recordsPerPage: number): Observable<any>{
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('recordsPerPage', recordsPerPage.toString());
    return this.http.get<CompanyDTO[]>(this.apiURL, {observe: 'response', params});
  }

  create(companyCreationDTO: CompanyCreationDTO):Observable<number> {
    const formData: FormData = this.BuildFormData(companyCreationDTO);
    console.log(Array.from(formData));
    return this.http.post<number>(this.apiURL, formData);
  }

  resetSettings(companySettingsDTO: CompanySettingsDTO):Observable<any> {
    const formData: FormData = this.BuildCompanySettingsFormData(companySettingsDTO);
    console.log(Array.from(formData));
    return this.http.put(`${this.apiURL}/resetCompanySettings`, formData, {observe: 'response'});
  }

  getMinimumAnnualLeaveDaysInCompany(companyId: number) {
    return this.http.get<CompanySettingsDTO>(`${this.apiURL}/getMinimumAnnualLeaveDaysInCompany/${companyId}`);
  }

  private BuildFormData(company: any): FormData {
    const formData = new FormData();

    formData.append('name', company.name);
    formData.append('address', company.address);
    formData.append('country', company.country);
    formData.append('minimumAnnualLeaveDays', company.minimumAnnualLeaveDays);

    if(company.website){
      formData.append('website', company.website);
    }
    if(company.logo){
      formData.append('logo', company.logo);
    }

    formData.append('creationDate', this.pipe.transform(company.creationDate, 'yyyy-MM-dd HH:mm:ss') );

    return formData;

  }

  private BuildCompanySettingsFormData(companySettings: CompanySettingsDTO): FormData {
    const formData = new FormData();

    formData.append('companyId', companySettings.companyId.toString());
    formData.append('minimumAnnualLeaveDays', companySettings.minimumAnnualLeaveDays.toString());

    return formData;

  }
}
