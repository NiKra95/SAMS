import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatDateFormData } from '../utilites/utils';
import { ApplicationAdminCreationDTO, ApplicationAdminDTO,
         CompanyAdminCreationDTO, CompanyAdminDTO, CompanyAdminEditDTO, CurrentUserInfoDTO, EditUserDetailsDTO, EmployeeCreationDTO, EmployeeDTO, EmployeeEditDTO, EmployeeSettingsEditDTO, UserDetailsDTO} from './users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {  }

  public currentUserInfo: CurrentUserInfoDTO;

  private apiURL = environment.apiURL + "/users";


  //Common User Methods
  getCurrentUserInfo(id: string): Observable<CurrentUserInfoDTO> {
    return this.http.get<CurrentUserInfoDTO>(`${this.apiURL}/getCurrentUserInfo/${id}`);
  }

  getDefaultUserPicture(gender: string)
  {
    var picturePath: string; 

    switch(gender)
        {
          case 'Unknown':
            {
              picturePath = '/assets/genders/default-avatar.jpg'
              break;
            }
          case 'Male':
          {
            picturePath = '/assets/genders/man-avatar.png'
            break;
          }
          case 'Female':
          {
            picturePath = '/assets/genders/woman-avatar.png'
            break;
          }
        }

        return picturePath;
  }

  getUserDetails(id: string): Observable<UserDetailsDTO>{
    return this.http.get<UserDetailsDTO>(`${this.apiURL}/getUserDetails/${id}`);
  }

  editUserDetails(id: string, userDetails: EditUserDetailsDTO) {
    const formData = this.buildFormDataForUserDetails(userDetails);
    console.log(Array.from(formData));
    return this.http.put(`${this.apiURL}/editUserDetails/${id}`, formData);
  }

  private buildFormDataForUserDetails(userDetails: EditUserDetailsDTO): FormData {
    const formData = new FormData();
      formData.append('firstName', userDetails.firstName);
      formData.append('lastName', userDetails.lastName);
      formData.append('email', userDetails.email);
      formData.append('address', userDetails.address);
      formData.append('gender', userDetails.gender);
      formData.append('dateOfBirth', formatDateFormData(userDetails.dateOfBirth));

      if(userDetails.picture){
        formData.append('picture', userDetails.picture);
      }

      return formData;
  }

  //Application Admin methods
  createApplicationAdmin(applicationAdmin: ApplicationAdminCreationDTO) {
    const formData = this.buildFormDataForAppAdmin(applicationAdmin);
    console.log(Array.from(formData));
    return this.http.post(`${this.apiURL}/createApplicationAdmin`, formData);
  }

  getApplicationAdmins(page: number, recordsPerPage: number): Observable<any>{
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('recordsPerPage', recordsPerPage.toString());
    return this.http.get<ApplicationAdminDTO[]>(`${this.apiURL}/getApplicationAdmins`, {observe: 'response', params});
  }

  getApplicationAdminById(id: string): Observable<ApplicationAdminDTO>{
    return this.http.get<ApplicationAdminDTO>(`${this.apiURL}/getApplicationAdmin/${id}`);
  }

  editApplicationAdmin(id: string, appAdmin: ApplicationAdminCreationDTO) {
    const formData = this.buildFormDataForAppAdmin(appAdmin)
    return this.http.put(`${this.apiURL}/editApplicationAdmin/${id}`, formData);
  }

  deleteApplicationAdmin(id: string) {
    return this.http.delete(`${this.apiURL}/deleteApplicationAdmin/${id}`);
  }

  private buildFormDataForAppAdmin(appAdmin: ApplicationAdminCreationDTO): FormData {
    const formData = new FormData();
      formData.append('firstName', appAdmin.firstName);
      formData.append('lastName', appAdmin.lastName);
      formData.append('email', appAdmin.email);
      formData.append('address', appAdmin.address);
      formData.append('password', appAdmin.password);
      formData.append('gender', appAdmin.gender);
      formData.append('dateOfBirth', formatDateFormData(appAdmin.dateOfBirth));

      if(appAdmin.picture){
        formData.append('picture', appAdmin.picture);
      }

      return formData;
  }

  //Company Admin methods
  createCompanyAdmin(companyAdmin: CompanyAdminCreationDTO) {
    const formData = this.buildFormDataForCompanyAdmin(companyAdmin, 'create');
    console.log(Array.from(formData));
    return this.http.post(`${this.apiURL}/createCompanyAdmin`, formData);
  }

  getCompanyAdmins(page: number, recordsPerPage: number, id: number): Observable<any>{
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('recordsPerPage', recordsPerPage.toString());
    return this.http.get<CompanyAdminDTO[]>(`${this.apiURL}/getCompanyAdmins/${id}`, {observe: 'response', params});
  }

  getCompanyAdminById(id: string): Observable<CompanyAdminDTO>{
    return this.http.get<CompanyAdminDTO>(`${this.apiURL}/getCompanyAdmin/${id}`);
  }

  editCompanyAdmin(id: string, companyAdmin: CompanyAdminEditDTO) {
    const formData = this.buildFormDataForCompanyAdmin(companyAdmin, 'edit')
    console.log(Array.from(formData));
    return this.http.put(`${this.apiURL}/editCompanyAdmin/${id}`, formData);
  }

  deleteCompanyAdmin(id: string) {
    return this.http.delete(`${this.apiURL}/deleteCompanyAdmin/${id}`);
  }

  private buildFormDataForCompanyAdmin(companyAdmin: any, actionType: string): FormData {
    const formData = new FormData();

    switch(actionType) {
      case 'create': {
        formData.append('firstName', companyAdmin.firstName);
        formData.append('lastName', companyAdmin.lastName);
        formData.append('email', companyAdmin.email);
        formData.append('password', companyAdmin.password);
        formData.append('gender', companyAdmin.gender);
        formData.append('dateOfBirth', formatDateFormData(companyAdmin.dateOfBirth));
        formData.append('companyId', companyAdmin.companyId);
        break;
      }
      case 'edit': {
        formData.append('firstName', companyAdmin.firstName);
        formData.append('lastName', companyAdmin.lastName);
        formData.append('email', companyAdmin.email);
        formData.append('address', companyAdmin.address);
        formData.append('gender', companyAdmin.gender);
        formData.append('dateOfBirth', formatDateFormData(companyAdmin.dateOfBirth));

        if(companyAdmin.picture){
          formData.append('picture', companyAdmin.picture);
        }

        break;
      }
    }
      return formData;
  }

  //Employee methods
  createEmployee(employee: EmployeeCreationDTO) {
    const formData = this.buildFormDataForEmployee(employee, 'create');
    console.log(Array.from(formData));
    return this.http.post(`${this.apiURL}/createEmployee`, formData);
  }

  getCompanyEmployees(page: number, recordsPerPage: number, id: number): Observable<any>{
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('recordsPerPage', recordsPerPage.toString());
    return this.http.get<EmployeeDTO[]>(`${this.apiURL}/getCompanyEmployees/${id}`, {observe: 'response', params});
  }

  getEmployeeById(id: string): Observable<EmployeeDTO>{
    return this.http.get<EmployeeDTO>(`${this.apiURL}/getEmployee/${id}`);
  }

  editEmployee(id: string, employee: EmployeeEditDTO) {
    const formData = this.buildFormDataForEmployee(employee, 'edit')
    console.log(Array.from(formData));
    return this.http.put(`${this.apiURL}/editEmployee/${id}`, formData);
  }

  editEmployeeSettings(id: string, employee: EmployeeSettingsEditDTO) {
    const formData = this.buildFormDataForEmployee(employee, 'editSettings')
    console.log(Array.from(formData));
    return this.http.put(`${this.apiURL}/editEmployeeSettings/${id}`, formData);
  }

  deleteEmployee(id: string) {
    return this.http.delete(`${this.apiURL}/deleteEmployee/${id}`);
  }

  private buildFormDataForEmployee(employee: any, actionType: string): FormData {
    const formData = new FormData();

    switch(actionType) {
      case 'create': {
        formData.append('firstName', employee.firstName);
        formData.append('lastName', employee.lastName);
        formData.append('email', employee.email);
        formData.append('password', employee.password);
        formData.append('gender', employee.gender);
        formData.append('designation', employee.designation);
        formData.append('startWorkingDate', formatDateFormData(employee.startWorkingDate));
        formData.append('maximumAnnualLeave', employee.maximumAnnualLeave);
        formData.append('companyId', employee.companyId);
        break;
      }
      case 'edit': {
        formData.append('firstName', employee.firstName);
        formData.append('lastName', employee.lastName);
        formData.append('email', employee.email);
        formData.append('address', employee.address);
        formData.append('gender', employee.gender);
        formData.append('dateOfBirth', formatDateFormData(employee.dateOfBirth));

        if(employee.picture){
          formData.append('picture', employee.picture);
        }

        break;
      }
      case 'editSettings': {
        // formData.append('startWorkingDate', formatDateFormData(employee.startWorkingDate));
        formData.append('designation', employee.designation);
        formData.append('experienceInCompany', employee.experienceInCompany);
        formData.append('maximumAnnualLeave', employee.maximumAnnualLeave);

        break;
      }
    }

      return formData;
  }
}
