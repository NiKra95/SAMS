import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CompanyCreationDTO, CompanyDTO } from './company.model';

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
    return this.http.post<number>(this.apiURL, formData);
  }

  private BuildFormData(company: CompanyCreationDTO): FormData {
    const formData = new FormData();

    formData.append('name', company.name);
    formData.append('address', company.address);
    formData.append('country', company.country);

    if(company.website){
      formData.append('website', company.website);
    }
    if(company.logo){
      formData.append('logo', company.logo);
    }

    formData.append('creationDate', this.pipe.transform(company.creationDate, 'yyyy-MM-dd HH:mm:ss') );

    return formData;

  }
}
