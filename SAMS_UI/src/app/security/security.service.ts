import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CompanyAdminCreationDTO } from '../users/users.model';
import { formatDateFormData } from '../utilites/utils';
import { RegistrationRequest, RegistrationResponse } from './registration.model';
import { LoginRequest, AuthenticationResult, userDTO } from './security.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private http: HttpClient,
              private router: Router) { }

  private apiURL = environment.apiURL + "/accounts";
  private readonly tokenKey: string = 'token';
  private readonly expirationTokenKey: string = 'token-expiration';

  
  getToken() : string | null {
    return localStorage.getItem(this.tokenKey);
  }
  
  getFieldFromJWT(field: string): string {
    const token =  this.getToken();
    if(!token){return '';}
    const dataToken = JSON.parse(atob(token.split('.')[1]));
    return dataToken[field];
  }
  
  getUserID() {
    return this.getFieldFromJWT('userID');
  }

  getRole() {
    return this.getFieldFromJWT("userRole");
  }


  getCompanyID() {
    return this.getFieldFromJWT('companyId');
  }

  IsCompanyCreator() {
    return this.getFieldFromJWT('companyCreator');
  }
  
  isAuthenticated() {
    const token = this.getToken();

    if(!token){
      return false;
    }

    const expiration = localStorage.getItem(this.expirationTokenKey);
    const expirationDate = new Date(expiration);

    if(expirationDate <= new Date()){
      this.logout();
      window.location.reload();
      return false;
    }

    return true;
  }
  
  login(loginRequest: LoginRequest): Observable<AuthenticationResult> {
    let url = this.apiURL + "/login";
    return this.http.post<AuthenticationResult>(url, loginRequest);
  }

  logout(){
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.expirationTokenKey);
    this.router.navigate(["/home"]);
  }

  saveToken(loginResult: AuthenticationResult){
    localStorage.setItem(this.tokenKey, loginResult.token);
    localStorage.setItem(this.expirationTokenKey, loginResult.expiration.toString());
  }

  registerCompanyAdmin(companyAdmin: CompanyAdminCreationDTO): Observable<AuthenticationResult>{
    const formData: FormData = this.convertCompanyAdminToFormData(companyAdmin);
    return this.http.post<RegistrationResponse>(`${this.apiURL}/registerCompanyAdmin`, formData);
  };

  private convertCompanyAdminToFormData(companyAdmin: CompanyAdminCreationDTO): FormData {
    const formData = new FormData();

    formData.append('firstName', companyAdmin.firstName);
    formData.append('lastName', companyAdmin.lastName);
    formData.append('email', companyAdmin.email);
    formData.append('password', companyAdmin.password);
    formData.append('gender', companyAdmin.gender);
    formData.append('dateOfBirth', formatDateFormData(companyAdmin.dateOfBirth));
    formData.append('companyId', companyAdmin.companyId.toString());

    return formData;
  }
}
