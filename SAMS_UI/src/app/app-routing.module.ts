import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { IndexAbsencesComponent } from './absences/index-absences/index-absences.component';
import { CalendarComponent } from './calendar/calendar/calendar.component';
import { IndexCompaniesComponent } from './companies/index-companies/index-companies.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
// import { IndexDepartmentsComponent } from './departments/index-departments/index-departments.component';
import { IndexEmployeesComponent } from './employees/index-employees/index-employees.component';
import { HelpComponent } from './help/help.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { IndexUsersComponent } from './users/index-users/index-users.component';
import { LoginComponent } from './security/login/login.component';
import { RegisterCompanyComponent } from './security/register-company/register-company.component';
import { IsApplicationAdminGuard } from './security/route-guards/is-application-admin.guard';
import { IsCompanyAdminGuard } from './security/route-guards/is-company-admin.guard';
import { IsEmployeeGuard } from './security/route-guards/is-employee.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [IsApplicationAdminGuard, IsCompanyAdminGuard]},
  {path: 'companies', component: IndexCompaniesComponent, canActivate: [IsApplicationAdminGuard]},
  {path: 'settings', component: SettingsComponent, canActivate: [IsApplicationAdminGuard, IsCompanyAdminGuard]},
  // {path: 'departments', component: IndexDepartmentsComponent},
  {path: 'users', component: IndexUsersComponent, canActivate: [IsApplicationAdminGuard]}, 
  {path: 'employees', component: IndexEmployeesComponent, canActivate: [IsCompanyAdminGuard]},
  {path: 'absences', component: IndexAbsencesComponent, canActivate: [IsCompanyAdminGuard, IsEmployeeGuard]},
  {path: 'calendar', component: CalendarComponent, canActivate: [IsCompanyAdminGuard, IsEmployeeGuard]},

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
