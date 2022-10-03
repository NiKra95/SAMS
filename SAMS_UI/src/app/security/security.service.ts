import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest, LoginResult, userDTO } from './security.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + "/accounts";
  private readonly tokenKey: string = 'token';
  private readonly expirationTokenKey: string = 'token-expiration';
  private readonly roleField = "role";

  // public tokenKey: string = "token";

  
  getToken() : string | null {
    return localStorage.getItem(this.tokenKey);
  }
  
  getFieldFromJWT(field: string): string {
    const token =  this.getToken();
    if(!token){return '';}
    const dataToken = JSON.parse(atob(token.split('.')[1]));
    return dataToken[field];
  }
  
  getRole() {
    return this.getFieldFromJWT(this.roleField);
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
      return false;
    }

    return true;
  }
  
  login(loginRequest: LoginRequest): Observable<LoginResult> {
    var url = this.apiURL + "/login";
    return this.http.post<LoginResult>(url, loginRequest);
  }

  logout(){
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.expirationTokenKey);
  }

  saveToken(loginResult: LoginResult){
    localStorage.setItem(this.tokenKey, loginResult.token);
    localStorage.setItem(this.expirationTokenKey, loginResult.expiration.toString());
  }
  

}
