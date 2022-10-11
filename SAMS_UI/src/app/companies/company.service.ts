import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CompanyCreationDTO } from './company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private router: Router,
              private http: HttpClient) { }

  private apiURL = environment.apiURL + "/companies";

  create(companyCreationDTO: CompanyCreationDTO):Observable<number> {
    const formData: FormData = this.BuildFormData(companyCreationDTO);
    // console.log(Array.from(formData));
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

    return formData;

  }
}
