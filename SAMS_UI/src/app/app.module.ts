import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms'
import {FlexLayoutModule} from '@angular/flex-layout';

import { MaterialModule } from './material/material.module';
import { TopNavigationComponent } from './menu/top-navigation/top-navigation.component';
import { SideNavigationComponent } from './menu/side-navigation/side-navigation.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { IndexCompaniesComponent } from './companies/index-companies/index-companies.component';
import { IndexDepartmentsComponent } from './departments/index-departments/index-departments.component';
import { IndexUsersComponent } from './users/index-users/index-users.component';
import { IndexEmployeesComponent } from './employees/index-employees/index-employees.component';
import { IndexAbsencesComponent } from './absences/index-absences/index-absences.component';
import { CalendarComponent } from './calendar/calendar/calendar.component';
import { SettingsComponent } from './settings/settings.component';
import { AboutComponent } from './about/about.component';
import { HelpComponent } from './help/help.component';
import { LoginComponent } from './security/login/login.component';
import { AuthorizeViewComponent } from './security/authorize-view/authorize-view.component';
// import { RegisterCompanyComponent } from './companies/register-company/register-company.component';
import { DisplayErrorsComponent } from './utilites/display-errors/display-errors.component';
import { GenericListComponent } from './utilites/generic-list/generic-list.component';
import { InputImgComponent } from './utilites/input-img/input-img.component';
import { AuthenticationFormComponent } from './security/authentication-form/authentication-form.component';
import {JwtInterceptorService} from './security/jwt-interceptor.service';
import { RegisterCompanyComponent } from './security/register-company/register-company.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopNavigationComponent,
    SideNavigationComponent,
    DashboardComponent,
    IndexCompaniesComponent,
    IndexDepartmentsComponent,
    IndexUsersComponent,
    IndexEmployeesComponent,
    IndexAbsencesComponent,
    CalendarComponent,
    SettingsComponent,
    AboutComponent,
    HelpComponent,
    LoginComponent,
    AuthorizeViewComponent,
    DisplayErrorsComponent,
    GenericListComponent,
    InputImgComponent,
    AuthenticationFormComponent,
    RegisterCompanyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
