import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyCreationDTO } from 'src/app/companies/company.model';
import { CompanyService } from 'src/app/companies/company.service';
import { CompanyAdminCreationDTO, Gender } from 'src/app/users/users.model';
import { parseWebAPIErrors } from 'src/app/utilites/utils';
import { RegistrationRequest } from '../registration.model';
import { LoginRequest } from '../security.model';
import { SecurityService } from '../security.service';


@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.scss']
})
export class RegisterCompanyComponent implements OnInit {

    constructor(private securityService: SecurityService,
                private companyService: CompanyService,
                private router: Router) { }

    errors: string[] = [];

    companyAdmin: CompanyAdminCreationDTO;
    company: CompanyCreationDTO;

    ngOnInit(): void {
      if(this.securityService.isAuthenticated()){
        this.router.navigate(['/home']);
      }
    }

    register(registrationRequest: RegistrationRequest) {
      this.company = { 
         name: registrationRequest.companyName,
         address: registrationRequest.companyAddress,
         country: registrationRequest.companyCountry,
         website: registrationRequest.companyWebsite,
         logo: registrationRequest.logo,
         creationDate: new Date()
      };

      this.companyService.create(this.company).subscribe(id => {
        var companyId = id;
    
        this.companyAdmin = {
          firstName: registrationRequest.firstName,
          lastName: registrationRequest.lastName,
          email: registrationRequest.email,
          password: registrationRequest.password,
          gender: registrationRequest.gender,
          dateOfBirth: registrationRequest.dateOfBirth,
          companyId: companyId
        }

        this.securityService.registerCompanyAdmin(this.companyAdmin).subscribe(registrationResult => {
          if(registrationResult.success && registrationResult.token) {
            this.securityService.saveToken(registrationResult);
            window.location.reload();
          }
          this.router.navigate(['/']);
        },  error => {
          this.errors = parseWebAPIErrors(error);
        }); 
      },  error => {
        this.errors = parseWebAPIErrors(error);
      });
    }
}
