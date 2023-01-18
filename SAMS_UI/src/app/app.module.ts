import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms'
import {FlexLayoutModule} from '@angular/flex-layout';
import { FullCalendarModule } from '@fullcalendar/angular';
import {NgApexchartsModule} from 'ng-apexcharts'



import { MaterialModule } from './material/material.module';
import { TopNavigationComponent } from './menu/top-navigation/top-navigation.component';
import { SideNavigationComponent } from './menu/side-navigation/side-navigation.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { IndexCompaniesComponent } from './companies/index-companies/index-companies.component';
import { IndexAbsencesComponent } from './absences/index-absences/index-absences.component';
import { AboutComponent } from './about/about.component';
import { HelpComponent } from './help/help.component';
import { LoginComponent } from './security/login/login.component';
import { AuthorizeViewComponent } from './security/authorize-view/authorize-view.component';
import { DisplayErrorsComponent } from './utilites/display-errors/display-errors.component';
import { GenericListComponent } from './utilites/generic-list/generic-list.component';
import { InputImgComponent } from './utilites/input-img/input-img.component';
import { AuthenticationFormComponent } from './security/authentication-form/authentication-form.component';
import {JwtInterceptorService} from './security/jwt-interceptor.service';
import { RegisterCompanyComponent } from './security/register-company/register-company.component';
import { RegisterCompanyFormComponent } from './security/register-company-form/register-company-form.component';
import { IndexApplicationAdminsComponent } from './users/application-admins/index-application-admins/index-application-admins.component';
import { IndexCompanyAdminsComponent } from './users/company-admins/index-company-admins/index-company-admins.component';
import { CreateAppAdminsComponent } from './users/application-admins/create-app-admins/create-app-admins.component';
import { FormAppAdminsComponent } from './users/application-admins/form-app-admins/form-app-admins.component';
import { EnumKeyValuePipe } from './utilites/pipes/enum-key-value.pipe';
import { AppAdminDetailsComponent } from './users/application-admins/app-admin-details/app-admin-details.component';
import { CompanyAdminDetailsComponent } from './users/company-admins/company-admin-details/company-admin-details.component';
import { CompanyDetailsComponent } from './companies/company-details/company-details.component';
import { EditAppAdminComponent } from './users/application-admins/edit-app-admin/edit-app-admin.component';
import { EditCompanyAdminComponent } from './users/company-admins/edit-company-admin/edit-company-admin.component';
import { CreateCompanyAdminComponent } from './users/company-admins/create-company-admin/create-company-admin.component';
import { FormCompanyAdminComponent } from './users/company-admins/form-company-admin/form-company-admin.component';
import { IndexEmployeesComponent } from './users/employees/index-employees/index-employees.component';
import { CreateEmployeeComponent } from './users/employees/create-employee/create-employee.component';
import { FormEmployeeComponent } from './users/employees/form-employee/form-employee.component';
import { EditEmployeeComponent } from './users/employees/edit-employee/edit-employee.component';
import { EmployeeDetailsComponent } from './users/employees/employee-details/employee-details.component';
import { EditUserDetailsComponent } from './users/common/edit-user-details/edit-user-details.component';
import { CreateAbsenceComponent } from './absences/create-absence/create-absence.component';
import { IndexCompanyAbsencesComponent } from './absences/index-company-absences/index-company-absences.component';
import { AbsenceDetailsComponent } from './absences/absence-details/absence-details.component';
import { EditAbsenceComponent } from './absences/edit-absence/edit-absence.component';
import { UserAbsencesCalendarComponent } from './calendar/user-absences-calendar/user-absences-calendar.component';
import { CompanyAbsencesCalendarComponent } from './calendar/company-absences-calendar/company-absences-calendar.component';
import { CompanySettingsComponent } from './settings/company-settings/company-settings.component';
import { FormCompanySettingsComponent } from './settings/company-settings/form-company-settings/form-company-settings.component';
import { EmployeeHomePageComponent } from './home/employee-home-page/employee-home-page.component';
import { CompanyDashboardComponent } from './dashboard/company-dashboard/company-dashboard.component';
import { ApplicationDashboardComponent } from './dashboard/application-dashboard/application-dashboard.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopNavigationComponent,
    SideNavigationComponent,
    DashboardComponent,
    IndexCompaniesComponent,
    IndexAbsencesComponent,
    AboutComponent,
    HelpComponent,
    LoginComponent,
    AuthorizeViewComponent,
    DisplayErrorsComponent,
    GenericListComponent,
    InputImgComponent,
    AuthenticationFormComponent,
    RegisterCompanyComponent,
    RegisterCompanyFormComponent,
    IndexApplicationAdminsComponent,
    IndexCompanyAdminsComponent,
    CreateAppAdminsComponent,
    FormAppAdminsComponent,
    EnumKeyValuePipe,
    AppAdminDetailsComponent,
    CompanyAdminDetailsComponent,
    CompanyDetailsComponent,
    EditAppAdminComponent,
    EditCompanyAdminComponent,
    CreateCompanyAdminComponent,
    FormCompanyAdminComponent,
    IndexEmployeesComponent,
    CreateEmployeeComponent,
    FormEmployeeComponent,
    EditEmployeeComponent,
    EmployeeDetailsComponent,
    EditUserDetailsComponent,
    CreateAbsenceComponent,
    IndexCompanyAbsencesComponent,
    AbsenceDetailsComponent,
    EditAbsenceComponent,
    UserAbsencesCalendarComponent,
    CompanyAbsencesCalendarComponent,
    CompanySettingsComponent,
    FormCompanySettingsComponent,
    EmployeeHomePageComponent,
    CompanyDashboardComponent,
    ApplicationDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    FullCalendarModule,
    NgApexchartsModule 
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
