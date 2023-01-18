import { Component, OnInit } from '@angular/core';
import { SecurityService } from 'src/app/security/security.service';
import { ApplicationDashboardDTO, CompanyDashboardDTO } from '../dashboard.model';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  applicationModel: ApplicationDashboardDTO;
  companyModel: CompanyDashboardDTO;

  constructor(public securityService: SecurityService,
              private dashboardService: DashboardService) { }

  ngOnInit(): void {
    if(this.securityService.getRole() == 'applicationAdmin') {
      this.dashboardService.getApplicationDashboardData().subscribe((applicationDashboardData: ApplicationDashboardDTO) => {
        this.applicationModel = applicationDashboardData;
      });
    }
    
    if(this.securityService.getRole() == 'companyAdmin') {
      let companyId = parseInt(this.securityService.getCompanyID());
      this.dashboardService.getCompanyDashboardData(companyId).subscribe((companyDashboardData: CompanyDashboardDTO) => {
        this.companyModel = companyDashboardData;
      });
    }

  
  }

}
