import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanySettingsDTO } from 'src/app/companies/company.model';
import { CompanyService } from 'src/app/companies/company.service';
import { SecurityService } from 'src/app/security/security.service';
import Swal from 'sweetalert2';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-company-settings',
  templateUrl: './company-settings.component.html',
  styleUrls: ['./company-settings.component.scss']
})
export class CompanySettingsComponent implements OnInit {

  errors: string[] = [];

  constructor(private securityService: SecurityService,
              private companyService: CompanyService,
              private router: Router) { }

  model: CompanySettingsDTO;


  ngOnInit(): void {
    let companyId = parseInt(this.securityService.getCompanyID());
    this.companyService.getMinimumAnnualLeaveDaysInCompany(companyId).subscribe((response: CompanySettingsDTO) => {
      this.model = response;
    });
  }

  resetCompanySettings(companySettings: CompanySettingsDTO) {
    Swal.fire({
      title: 'Do you want to reset?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if(result.value) {
        companySettings.companyId = parseInt(this.securityService.getCompanyID());
          this.companyService.resetSettings(companySettings).subscribe(() => {
            Swal.fire(
              'Resetting successfully',
              'Company settings have been reset.',
              'success'
            ).then(() => {
              this.router.navigate(['/dashboard']);  
            })
          });
      } else if(result.dismiss === Swal.DismissReason.cancel) {}
    })
  }

}
