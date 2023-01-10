import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanySettingsDTO } from 'src/app/companies/company.model';
import { CompanyService } from 'src/app/companies/company.service';
import { SecurityService } from 'src/app/security/security.service';
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
    companySettings.companyId = parseInt(this.securityService.getCompanyID());
    this.companyService.resetSettings(companySettings).subscribe(() => {
    });
  }

}
