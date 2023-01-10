import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { IndexAbsencesComponent } from './absences/index-absences/index-absences.component';
import { IndexCompaniesComponent } from './companies/index-companies/index-companies.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { IndexEmployeesComponent } from './users/employees/index-employees/index-employees.component';
import { HelpComponent } from './help/help.component';
import { HomeComponent } from './home/home.component';
import { IndexApplicationAdminsComponent } from './users/application-admins/index-application-admins/index-application-admins.component';
import { IndexCompanyAdminsComponent } from './users/company-admins/index-company-admins/index-company-admins.component';
import { LoginComponent } from './security/login/login.component';
import { RegisterCompanyComponent } from './security/register-company/register-company.component';
import { IsApplicationAdminGuard } from './security/route-guards/is-application-admin.guard';
import { IsCompanyAdminGuard } from './security/route-guards/is-company-admin.guard';
import { IsEmployeeGuard } from './security/route-guards/is-employee.guard';
import { CreateAppAdminsComponent } from './users/application-admins/create-app-admins/create-app-admins.component';
import { IsAdminGuard } from './security/route-guards/is-admin.guard';
import { CreateCompanyAdminComponent } from './users/company-admins/create-company-admin/create-company-admin.component';
import { CreateEmployeeComponent } from './users/employees/create-employee/create-employee.component';
import { CreateAbsenceComponent } from './absences/create-absence/create-absence.component';
import { IndexCompanyAbsencesComponent } from './absences/index-company-absences/index-company-absences.component';
import { UserAbsencesCalendarComponent } from './calendar/user-absences-calendar/user-absences-calendar.component';
import { CompanyAbsencesCalendarComponent } from './calendar/company-absences-calendar/company-absences-calendar.component';
import { CompanySettingsComponent } from './settings/company-settings/company-settings.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [IsApplicationAdminGuard, IsCompanyAdminGuard]},
  {path: 'application-admins', component: IndexApplicationAdminsComponent, canActivate: [IsApplicationAdminGuard]},
  {path: 'application-admins/create', component: CreateAppAdminsComponent, canActivate: [IsApplicationAdminGuard]}, 
  {path: 'companies', component: IndexCompaniesComponent, canActivate: [IsApplicationAdminGuard]},
  {path: 'company-admins', component: IndexCompanyAdminsComponent, canActivate: [IsAdminGuard]},
  {path: 'company-admins/create', component: CreateCompanyAdminComponent, canActivate: [IsCompanyAdminGuard]},
  {path: 'employees', component: IndexEmployeesComponent, canActivate: [IsCompanyAdminGuard]},
  {path: 'employees/create', component: CreateEmployeeComponent, canActivate: [IsCompanyAdminGuard]},
  {path: 'absences', component: IndexAbsencesComponent, canActivate: [IsEmployeeGuard]},
  {path: 'absences/create', component: CreateAbsenceComponent, canActivate: [IsEmployeeGuard]},
  {path: 'company-absences', component: IndexCompanyAbsencesComponent, canActivate: [IsCompanyAdminGuard]},
  {path: 'user-absences-calendar', component: UserAbsencesCalendarComponent, canActivate: [IsEmployeeGuard]},
  {path: 'company-absences-calendar', component: CompanyAbsencesCalendarComponent, canActivate: [IsCompanyAdminGuard]},
  {path: 'company-settings', component: CompanySettingsComponent, canActivate: [IsCompanyAdminGuard]},

  {path: 'about', component: AboutComponent},
  {path: 'help', component: HelpComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register-company', component: RegisterCompanyComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
